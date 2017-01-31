<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'athraeln_wp296');

/** MySQL database username */
define('DB_USER', 'athraeln_wp296');

/** MySQL database password */
define('DB_PASSWORD', '5u-)PSO494');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'tvjrtd7kthjvklrpb8issix6oul0b1yhaislpzdt5gklitnqb0uiso8mbta4hve8');
define('SECURE_AUTH_KEY',  'e2h7ltahyah36erxd4bh7ukrnyupgfihj6herx5fvqgjwp7nnwkkeh5higgstqyd');
define('LOGGED_IN_KEY',    'y19mzm6yqoqifgkg2ohjefbnagsjiq5qeuoqchuvawrxycakfpq1mwqn50wcpuyd');
define('NONCE_KEY',        'cteg9mryqxcx2acxalbre3kfmba296rd2t3qwlwppjhur4ktghzic0mzltrw983d');
define('AUTH_SALT',        'rbf12yu29e4paqzwesovpwhyurosm5cctqsd35q6o1nalzo3pe5ynqvl4g5qoch5');
define('SECURE_AUTH_SALT', 'y1vbxyldxbedkr3t8mktv3kxl1i20n310ug2v3lokx1x3arlw5pgicwgxe2wvjwv');
define('LOGGED_IN_SALT',   'ec3ufdyq1dejjovhu3bloy3h4zj1howmllcflrx6jtwlwcivjlqs3q7j6pscf8nk');
define('NONCE_SALT',       'pvxmiahck0tolywbus6axv9gqdzjhjaroebhklpscmaavjovfgz0eh3vupvezyhu');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
