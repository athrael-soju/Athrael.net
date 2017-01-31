<?php 
/*
 *The single post template file
 */
get_header(); ?>
<section id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php while ( have_posts() ) : the_post(); ?>
	<!--breadcrumb start-->
	<div class="royals-container container">
		<div class="site-breadcumb">
			<h1><?php echo get_the_title(); ?></h1>
			<ol class="breadcrumb breadcrumb-menubar">
				<?php if (function_exists('rider_custom_breadcrumbs')) rider_custom_breadcrumbs(); ?>                    
			</ol>
		</div>  
	</div>
	<!--breadcrumb end-->          

	<!--blog start-->
	<div class="royals-container container">
		<div class="row">
			<div class="col-md-8 col-sm-7 blog-box">
				<div class="blog-wrap">
					<div class="blog-info">
						<div class="blog-date">
							<a class="color-text" href="<?php echo get_month_link(get_the_time('Y'),get_the_time('m')); ?>"> 
								<b><?php echo get_the_date('d'); ?></b>
								<span><?php echo get_the_time('M').' '.get_the_time('y'); ?></span>
							</a>
						</div>
						<div class="blog-meta">
                        	<strong><?php echo get_the_title() ?></strong>
								<?php rider_entry_meta(); ?>                                    
						</div>
					</div>
					<div class="blog-content">
						
					<?php
							if ( has_post_thumbnail() ) : 
								the_post_thumbnail( 'rider-blog-image', array( 'alt' => get_the_title(), 'class' => 'img-responsive') ); 
							endif;
							
						the_content();
						wp_link_pages( array(
										'before'      => '<div class="col-md-6 col-xs-6">' . __( 'Pages', 'rider' ) . ':',
										'after'       => '</div>',
										'link_before' => '<span>',
										'link_after'  => '</span>',
										) );
						?>                               
					</div>
					<?php edit_post_link( __( 'Edit', 'rider' ), '' ); ?>
					<div class="comments-area">  
						<?php comments_template( '', true ); ?>                             
					</div>
					<div class="rider-pagination">
						<?php rider_pagination(); ?>
					</div>

				</div>   
			</div>
			
			<?php endwhile; ?>
			
			<div class="col-md-4 col-sm-5">
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>
	<!--blog end-->


</section>
<?php get_footer(); ?>
