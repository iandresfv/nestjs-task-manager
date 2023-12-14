-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE task-manager-db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'task-manager-db')\gexec