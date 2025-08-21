/*
  # Add password field to users table

  1. Schema Changes
    - Add `password` field to users table (hashed password)
    - Remove `auth0Id` field as we're moving away from Auth0
    - Make email the primary authentication field
    - Add username field for login

  2. Security
    - Password will be hashed using bcrypt
    - Username will be unique for login purposes
*/

-- Add password and username fields
ALTER TABLE users ADD COLUMN password TEXT;
ALTER TABLE users ADD COLUMN username TEXT;

-- Drop auth0Id constraint and column
ALTER TABLE users DROP CONSTRAINT users_auth0Id_key;
ALTER TABLE users DROP COLUMN auth0Id;

-- Add unique constraint for username
ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);

-- Make password required (we'll handle this in the application)
-- ALTER TABLE users ALTER COLUMN password SET NOT NULL;