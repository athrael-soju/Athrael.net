<?php 
/*
 * Set up the content width value based on the theme's design.
 */
if ( ! function_exists( 'rider_setup' ) ) :
function rider_setup() {
	
	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary'   => __( 'Main Menu', 'rider' ),	
	) );
	
	if ( ! isset( $content_width ) ) $content_width = 770;
		/*
		 * Make rider theme available for translation.
		 */

	load_theme_textdomain( 'rider', get_template_directory() . '/languages' );
	// This theme styles the visual editor to resemble the theme style.
	add_editor_style(array('css/editor-style.css', rider_font_url()));
	// Add RSS feed links to <head> for posts and comments.
	add_theme_support('automatic-feed-links');
	add_theme_support( 'title-tag' );
	add_theme_support('post-thumbnails');
	
	set_post_thumbnail_size(672, 372, true);
	add_image_size('rider-full-width', 1110, 576, true);
	add_image_size('rider-blog-image', 710, 470, true);
	add_image_size('rider-author-image', 159, 159, true);
	add_image_size('rider-blog-one', 772, 515, true);
	add_image_size('rider-blog-two', 372, 245, true);
	
	
	/*        
	* Switch default core markup for search form, comment form, and comments        
	* to output valid HTML5.        
	*/
	add_theme_support('html5', array(
	   'search-form', 'comment-form', 'comment-list',
	));
	
	add_theme_support( 'custom-header', apply_filters( 'rider_custom_header_args', array(
		'uploads'       => true,
		'flex-height'   => true,
		'default-text-color' => '#fff',
		'header-text' => true,
		'height' => '120',
		'width'  => '1260'
 	) ) );
	add_theme_support( 'custom-background', apply_filters( 'rider_custom_background_args', array(
		'default-color' => 'f5f5f5',
	) ) );
	
	// Add support for featured content.
	add_theme_support('featured-content', array(
	   'featured_content_filter' => 'rider_get_featured_posts',
	   'max_posts' => 6,
	));
	
	// This theme uses its own gallery styles.       
	add_filter('use_default_gallery_style', '__return_false');   	
	
	
}

endif; // rider_setup
add_action( 'after_setup_theme', 'rider_setup' );


add_action('wp_head','rider_header_bg_img_css');
function rider_header_bg_img_css()
{
	$rider_options = get_option('rider_theme_options');
	if(!empty($rider_options['rider_headertop-bg'])) { $rider_header_bg_img = $rider_options['rider_headertop-bg']; }
	$rider_header_output = '';
	if(!empty($rider_header_bg_img)) {$rider_header_output="<style> .header_bg { background :url('".esc_url($rider_header_bg_img)."'); } </style>"; }
	echo $rider_header_output;
}
function rider_get_image_id($rider_image_url) {
	global $wpdb;
	$rider_attachment = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE guid='%s';", $rider_image_url )); 
    return $rider_attachment[0]; 
}


/*** Enqueue css and js files ***/
function rider_enqueue()
{
	wp_enqueue_style('rider-bootstrap',get_template_directory_uri().'/css/bootstrap.css',array());
	wp_enqueue_style('rider-font-awesome',get_template_directory_uri().'/css/font-awesome.css',array());
	wp_enqueue_style('rider-style',get_stylesheet_uri(),array());
	
	wp_enqueue_script('rider-bootstrapjs',get_template_directory_uri().'/js/bootstrap.js',array('jquery')); 
	wp_enqueue_script('rider-defaultjs',get_template_directory_uri().'/js/default.js',array('jquery'));

	if ( is_singular() ) wp_enqueue_script( "comment-reply" ); 
}
add_action('wp_enqueue_scripts', 'rider_enqueue');


/*** Theme Default Setup ***/
require get_template_directory() . '/inc/theme-default-setup.php';

/*** Breadcrumbs ***/
require get_template_directory() . '/inc/breadcrumbs.php';

/*** Theme options ***/
require get_template_directory() . '/theme-options/theme-options.php';

/*** Custom Header ***/
require get_template_directory() . '/inc/custom-header.php';



