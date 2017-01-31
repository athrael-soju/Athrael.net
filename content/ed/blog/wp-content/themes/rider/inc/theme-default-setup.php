<?php
/*
 * thumbnail list
*/ 
function rider_thumbnail_image($content) {
    if( has_post_thumbnail() )
         return the_post_thumbnail( 'thumbnail' ); 
}
/*
* Register OpenSans Google font for rider
*/
function rider_font_url() {
   $rider_font_url = '';
	/*
	 * Translators: If there are characters in your language that are not supported
	 * by OpenSans, translate this to 'off'. Do not translate into your own language.
	 */   
	if ( 'off' !== _x( 'on', 'OpenSans font: on or off', 'advent' ) ) {
		$rider_font_url = add_query_arg( 'family', urlencode( 'OpenSans:300,400,700,900,300italic,400italic,700italic' ), "//fonts.googleapis.com/css?family=Open+Sans" );
	}
   return $rider_font_url;
}
/*
 * rider Main Sidebar
*/
function rider_widgets_init() {

	register_sidebar( array(
		'name'          => __( 'Main Sidebar', 'rider' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Main sidebar that appears on the right.', 'rider' ),
		'before_widget' => '<div class="sidebar-widget %2$s" id="%1$s" >',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'rider_widgets_init' );

/*
 * rider Set up post entry meta.
 *
 * Meta information for current post: categories, tags, permalink, author, and date.
 */
function rider_entry_meta() {
	$rider_options = get_option('rider_theme_options');
	$rider_category_list = get_the_category_list( ', ',' ');
	
	$rider_tag_list = get_the_tag_list('<li> <span>'.__('Tags : ','rider'),', ',' '.'</span> </li>');
	$rider_date = sprintf( '<time datetime="%1$s">%2$s</time>',
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() )
	);

	$rider_author = sprintf( '<a href="%1$s" title="%2$s" >%3$s</a>',
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_attr( sprintf( __( 'View all posts by %s', 'rider' ), get_the_author() ) ),
		get_the_author()
	);
	$post_in = '';
	$post_by = '';
	$post_tag = '';
	$post_comment ='';
	
	$post_in = '<li><span>'.__('Category ','rider') .' : %1$s  </span></li>';
	
	$post_by = '<li><span>'. __('Author ','rider').' : %4$s </span></li>';
	$post_tag = ' %2$s ';
	$post_comment= '<li>'. rider_comment_number_custom() .'</li>';
	
	if (empty($rider_options['remove-category']) || empty($rider_options['remove-date']) || empty($rider_options['remove-author']) || empty($rider_options['remove-tags']) || empty($rider_options['remove-comment'])):

	if ($rider_tag_list) {
		$rider_utility_text = '<div class="post-meta"><ul>'. $post_in . $post_by . $post_tag . $post_comment.'</ul></div>';
		
	} elseif ( $rider_category_list ) {
		$rider_utility_text = '<div class="post-meta"><ul>'. $post_in . $post_by . $post_tag . $post_comment.'</ul></div>';
	} else {
		$rider_utility_text = '<div class="post-meta"><ul>'. $post_by . $post_tag . $post_comment .'</ul></div>';
	}
	endif;
	
	printf(
		$rider_utility_text,
		$rider_category_list,
		$rider_tag_list,
		$rider_date,
		$rider_author
	);
}

function rider_comment_number_custom(){
$rider_num_comments = get_comments_number(); // get_comments_number returns only a numeric value
$rider_comments=__('No Comments','rider');
if ( comments_open() ) {
	if ( $rider_num_comments == 0 ) {
		$rider_comments = __('No Comments','rider');
	} elseif ( $rider_num_comments > 1 ) {
		$rider_comments = $rider_num_comments . __(' Comments','rider');
	} else {
		$rider_comments = __('1 Comment','rider');
	}
}
return $rider_comments;
}

function rider_pagination()
{
	if(is_single()){
		the_post_navigation( array(
			'prev_text' => '<div class="rider_previous_pagination alignleft"><span class="pagination_arrow"> &lt;&lt; </span>%title </div>',
			'next_text' => '<div class="rider_next_pagination alignright">%title<span class="pagination_arrow"> &gt;&gt; </span></div>',
		) );
	}else{
	the_posts_pagination( array(
				'prev_text'          => __( 'Previous', 'rider' ),
				'next_text'          => __( 'Next', 'rider' ),
				'before_page_number' => '<span class="meta-nav screen-reader-text">' . ' ' . ' </span>',
			) );  
		}
}

/*
 *  excerpt Length 
 */ 
function rider_change_excerpt_more( $rider_more ) {
    return '...';
}
add_filter('excerpt_more', 'rider_change_excerpt_more');

/*
 * Comments placeholder function
 */
add_filter( 'comment_form_default_fields', 'rider_comment_placeholders' );

function rider_comment_placeholders( $rider_field )
{
	$rider_field['author'] = str_replace(
		'<input',
		'<input placeholder="'
		. _x(
		'Name *',
		'comment form placeholder',
		'rider'
		)
		. '" required',
		
	$rider_field['author']
	);
	$rider_field['email'] = str_replace(
		'<input',
		'<input placeholder="'
		. _x(
		'Email Id *',
		'comment form placeholder',
		'rider'
		)
		. '" required',
	$rider_field['email']
	);
	$rider_field['url'] = str_replace(
		'<input',
		'<input placeholder="'
		. _x(
		'Website URl',
		'comment form placeholder',
		'rider'
		)
		. '" required',
	$rider_field['url']
	);
	
	return $rider_field;
}
add_filter( 'comment_form_defaults', 'rider_textarea_insert' );
function rider_textarea_insert( $rider_field )
	{
		$rider_field['comment_field'] = str_replace(
			'<textarea',
			'<textarea  placeholder="'
			. _x(
			'Comment',
			'comment form placeholder',
			'rider'
			)
		. '" ',
		$rider_field['comment_field']
		);
	return $rider_field;
	}
?>
