import sys
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

# Ajustar el sys.path para incluir la carpeta backend
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

# Importar la metadata de tus modelos
from app.database import Base  # Ajusta la importación de acuerdo a tu estructura
from app import models  # Asegúrate de que tus modelos estén importados aquí

# Configuración de Alembic
config = context.config

# Configuración del logging desde el archivo de configuración
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata de tus modelos
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Ejecutar migraciones en modo 'offline'."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Ejecutar migraciones en modo 'online'."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
