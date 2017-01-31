<?php 
/*
 * Search template file
 */
get_header(); ?>
<section id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <!--breadcrumb start-->
            <div class="royals-container container">
                <div class="site-breadcumb">
                    <h1><?php printf( __( 'Search Results for: %s', 'rider' ), get_search_query() ); ?></h1>
                     <ol class="breadcrumb breadcrumb-menubar">
                        <?php if (function_exists('rider_custom_breadcrumbs')) rider_custom_breadcrumbs(); ?>                    </ol>
                </div>  
            </div>
            <!--breadcrumb end-->          

            <!--blog start-->
            <div class="royals-container container">
                <div class="row">
                    <div class="col-md-8 col-sm-7 blog-box">
                        <?php if(have_posts()) : while ( have_posts() ) : the_post(); ?>
						
						<div class="blog-wrap">
                            <div class="blog-info">
                                <div class="blog-date">
									<?php get_the_date() ?>
                                    <a class="color-text" href="<?php echo get_month_link(get_the_time('Y'),get_the_time('m')); ?>"> 
                                        <b><?php echo get_the_date('d'); ?></b>
                                        <span><?php echo get_the_time('M').' '.get_the_time('y'); ?></span>
                                    </a>
                                </div>
                                <div class="blog-meta">
                                    <a href="<?php echo esc_url( get_permalink() ); ?>" class="blog-title"><?php the_title(); ?></a>
									<?php rider_entry_meta(); ?>
                                </div>
                            </div>
                            <div class="blog-content">
                                <?php if ( has_post_thumbnail() ) : ?>
										<a href="<?php echo esc_url( get_permalink() ); ?>"> 
										<?php the_post_thumbnail( 'rider-blog-image', array( 'alt' => get_the_title(), 'class' => 'img-responsive') ); ?>
										</a>
								<?php endif; ?>
                                <?php the_excerpt(); ?>
                                <div class="read-more col-md-offset-3 col-md-6">
                                    <a href="<?php echo esc_url( get_permalink()); ?>"><?php _e('READ MORE','rider'); ?></a>
                                </div>
                            </div>
                        </div>
						
						<?php endwhile; else: ?>
						
							<h1><?php _e('Not Found','rider'); ?></h1>
								<?php get_search_form(); ?>
						<?php endif; ?>
                        <div class="site-pagination">
									<?php rider_pagination(); ?>			
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-5">
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            </div>
            <!--blog end-->


        </section>
<?php get_footer(); ?>		
