<?php
/**
 * 404 pages (not found)
*/
get_header(); ?>
<section class="not-found">

<div class="royals-container container">
	<div class="site-breadcumb">
		<h1 class="page-title-404"><?php _e( 'Oops! That page can&rsquo;t be found.', 'rider' ); ?></h1>
		<ol class="breadcrumb breadcrumb-menubar">
			<?php if (function_exists('rider_custom_breadcrumbs')) rider_custom_breadcrumbs(); ?>                    
		</ol>
	</div>  
</div>

 <div class="royals-container container">
     <div class="blog-content">
		<p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'rider' ); ?></p>
		<?php get_search_form(); ?>
	</div>
 </div>
</section>
<?php get_footer(); ?>