<?php
/*
 * rider Breadcrumbs
*/
function rider_custom_breadcrumbs() {

  $rider_showonhome = 0; // 1 - show breadcrumbs on the homepage, 0 - don't show
  $rider_delimiter = ' / '; // rider_delimiter between crumbs
  $rider_home = __('Home','rider'); // text for the 'Home' link
  $rider_showcurrent = 1; // 1 - show current post/page title in breadcrumbs, 0 - don't show
  $rider_before = ' '; // tag before the current crumb
  $rider_after = ' '; // tag after the current crumb

  global $post;
  $rider_homelink = home_url('/');

  if (is_home() || is_front_page()) {

    if ($rider_showonhome == 1) echo '<li><a href="' . $rider_homelink . '">' . $rider_home . '</a></li>';
    
  }  else {

    echo '<li><a href="' . $rider_homelink . '">' . $rider_home . '</a> ' . $rider_delimiter . '';
    
   if ( is_category() ) {
      $rider_thisCat = get_category(get_query_var('cat'), false);
      if ($rider_thisCat->parent != 0) echo get_category_parents($rider_thisCat->parent, TRUE, ' ' . $rider_delimiter . ' ');      
		echo $rider_before; _e('category','rider'); echo ' "'.single_cat_title('', false) . '"' . $rider_after;
    } 
    elseif ( is_search() ) {
      echo $rider_before; _e('Search Results For','rider'); echo ' "'. get_search_query() . '"' . $rider_after;

    } elseif ( is_day() ) {
      echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $rider_delimiter . ' ';
      echo '<a href="' . get_month_link(get_the_time('Y'),get_the_time('m')) . '">' . get_the_time('F') . '</a> ' . $rider_delimiter . ' ';
      echo $rider_before . get_the_time('d') . $rider_after;

    } elseif ( is_month() ) {
      echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $rider_delimiter . ' ';
      echo $rider_before . get_the_time('F') . $rider_after;

    } elseif ( is_year() ) {
      echo $rider_before . get_the_time('Y') . $rider_after;

    } elseif ( is_single() && !is_attachment() ) {
      if ( get_post_type() != 'post' ) {
        $rider_post_type = get_post_type_object(get_post_type());
        $rider_slug = $rider_post_type->rewrite;
        echo '<a href="' . $rider_homelink . '/' . $rider_slug['slug'] . '/">' . $rider_post_type->labels->singular_name . '</a>';
        if ($rider_showcurrent == 1) echo ' ' . $rider_delimiter . ' ' . $rider_before . get_the_title() . $rider_after;
      } else {
        $rider_cat = get_the_category(); $rider_cat = $rider_cat[0];
        $rider_cats = get_category_parents($rider_cat, TRUE, ' ' . $rider_delimiter . ' ');
        if ($rider_showcurrent == 0) $rider_cats = preg_replace("#^(.+)\s$rider_delimiter\s$#", "$1", $rider_cats);
        echo $rider_cats;
        if ($rider_showcurrent == 1) echo $rider_before . get_the_title() . $rider_after;
      }

    } elseif ( !is_single() && !is_page() && get_post_type() != 'post' && !is_404() ) {
      $rider_post_type = get_post_type_object(get_post_type());
      echo $rider_before . $rider_post_type->labels->singular_name . $rider_after;

    } elseif ( is_attachment() ) {
      $rider_parent = get_post($post->post_parent);
      $rider_cat = get_the_category($rider_parent->ID); $rider_cat = $rider_cat[0];
      echo get_category_parents($rider_cat, TRUE, ' ' . $rider_delimiter . ' ');
      echo '<a href="' . get_permalink($rider_parent) . '">' . $rider_parent->post_title . '</a>';
      if ($rider_showcurrent == 1) echo ' ' . $rider_delimiter . ' ' . $rider_before . get_the_title() . $rider_after;

    } elseif ( is_page() && !$post->post_parent ) {
      if ($rider_showcurrent == 1) echo $rider_before . get_the_title() . $rider_after;

    } elseif ( is_page() && $post->post_parent ) {
      $rider_parent_id  = $post->post_parent;
      $rider_breadcrumbs = array();
      while ($rider_parent_id) {
        $rider_page = get_page($rider_parent_id);
        $rider_breadcrumbs[] = '<a href="' . get_permalink($rider_page->ID) . '">' . get_the_title($rider_page->ID) . '</a>';
        $rider_parent_id  = $rider_page->post_parent;
      }
      $rider_breadcrumbs = array_reverse($rider_breadcrumbs);
      for ($rider_i = 0; $rider_i < count($rider_breadcrumbs); $rider_i++) {
        echo $rider_breadcrumbs[$rider_i];
        if ($rider_i != count($rider_breadcrumbs)-1) echo ' ' . $rider_delimiter . ' ';
      }
      if ($rider_showcurrent == 1) echo ' ' . $rider_delimiter . ' ' . $rider_before . get_the_title() . $rider_after;

    } elseif ( is_tag() ) {
      echo $rider_before; _e('Posts tagged','rider'); echo ' "'.  single_tag_title('', false) . '"' . $rider_after;

    } elseif ( is_author() ) {
       global $author;
      $rider_userdata = get_userdata($author);
      echo $rider_before; _e('Articles posted by ','rider'); echo $rider_userdata->display_name . $rider_after;

    } elseif ( is_404() ) {
      echo $rider_before; _e('Error 404','rider'); echo $rider_after;
    }
    
    if ( get_query_var('paged') ) {
      if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ' (';
      echo __('Page','rider') . ' ' . get_query_var('paged');
      if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ')';
    }
    echo '</li>';

  }
} 
