<?php 
/*
 * Template Name: Landing Page
 */
get_header();
$rider_options = get_option( 'rider_theme_options' );
?>
<section>

			<div class="royals-container  container">
                <div class="about-me">
                    <div class="title-box">
                        <?php if(!empty($rider_options['rider_aboutus-title'])) { ?><h2 class="content-heading"><?php  echo esc_html($rider_options['rider_aboutus-title']); ?></h2><?php } ?>
                    </div>
                    <div class="about-me-info">
                    <?php if(!empty($rider_options['rider_author-image'])) {
						  $rider_image = esc_url($rider_options['rider_author-image']); 
						  $rider_id = rider_get_image_id($rider_image);
						  $rider_image = wp_get_attachment_image_src($rider_id, 'rider-author-image');
					?>
                        <a href="<?php if(!empty($rider_options['rider_author-link'])) { echo esc_url($rider_options['rider_author-link']); } else { echo esc_url( home_url('/') ); } ?>"> <img class="img-circle author-img" alt="<?php echo esc_attr($rider_options['rider_aboutus-name']); ?>" src="<?php echo esc_url($rider_image[0]); ?>" width="<?php echo $rider_image[1]; ?>" height="<?php echo $rider_image[2]; ?>"> </a>
                    <?php } if(!empty($rider_options['rider_aboutus-name'])) { ?>    
                        <a href="<?php if(!empty($rider_options['rider_author-link'])) { echo esc_url($rider_options['rider_author-link']); } else { echo esc_url( home_url('/') ); } ?>" class="author-name"><?php echo esc_html($rider_options['rider_aboutus-name']); ?></a>
                    <?php } ?>    
                        <p class="color-text"> <?php if(!empty($rider_options['rider_author-location'])) { echo esc_html($rider_options['rider_author-location']); } ?></p>
                    <?php  if(!empty($rider_options['rider_homemsg'])) { ?>    
                        <p><?php echo wpautop($rider_options['rider_homemsg']); ?></p>
                    <?php } ?>    
                    </div>
                </div>               
            </div>

            <!--latest-blog start-->
            <div class="latest-blog-bg">
                <span class="mask-overlay"></span>
                <div class="royals-container  container">
                    <div class="title-box">
                        <?php if(!empty($rider_options['rider_blog-title'])) { ?><h2 class="content-heading"><?php echo esc_html($rider_options['rider_blog-title']); ?></h2><?php } ?>
                    </div>
                    <div class="row">
                    <?php
						$rider_home_args = array( 'posts_per_page'    => 3,
											'orderby'          => 'post_date',
											'order'            => 'DESC',
											'post_type'        => 'post',
											'post_status'      => 'publish',
											'meta_query' => array(
															array(
															 'key' => '_thumbnail_id',
															 'compare' => 'EXISTS'
															)),
														);
						$rider_home_post = new WP_Query( $rider_home_args );
					    $rider_home_i = 1;
						while ( $rider_home_post->have_posts() ) { $rider_home_post->the_post();
						if($rider_home_i == 1) { $rider_first_blog  = get_the_ID(); }
						if($rider_home_i == 2) { $rider_second_blog  = get_the_ID(); }
						if($rider_home_i == 3) { $rider_third_blog  = get_the_ID(); }
						$rider_home_i++; } ?>
                        <div class="col-md-8 latest-blog">
                            <?php
							 $rider_home_first_url = wp_get_attachment_image_src( get_post_thumbnail_id($rider_first_blog), 'rider-blog-one' );
							 if(!empty($rider_home_first_url)) { ?><a href="<?php echo esc_url(get_permalink($rider_first_blog)); ?>"><img src="<?php echo esc_url( $rider_home_first_url[0] ); ?>" width="<?php echo $rider_home_first_url[1]; ?>" height="<?php echo $rider_home_first_url[2]; ?>" alt="<?php echo esc_attr( get_the_title($rider_first_blog)); ?>" class="img-responsive"> </a><?php } ?>
                            <div class="blog-info">
                                <div class="blog-date">
                                    <a href="<?php echo get_month_link(get_the_time('Y',$rider_first_blog),get_the_time('m',$rider_first_blog)); ?>" class="color-text"> 
                                        <b><?php echo get_the_date('d',$rider_first_blog); ?></b>
                                        <span><?php echo get_the_time('M',$rider_first_blog).' '.get_the_time('y',$rider_first_blog); ?></span>
                                    </a>
                                </div>
                                <div class="blog-meta">
                                    <a class="blog-title" href="<?php echo esc_url(get_permalink($rider_first_blog)); ?>"><?php echo get_the_title($rider_first_blog); ?></a>
                                    <ul>
                                        <li> <span> <?php echo get_comments_number( $rider_first_blog ); ?> </span> <?php _e('Comments','rider'); ?></li>  
                                        <li><span> <?php _e('Posted By','rider'); ?>: </span><a href="<?php echo esc_url( get_author_posts_url(get_post_field( 'post_author', $rider_first_blog ))); ?>"><?php echo get_the_author_meta('user_login',get_post_field( 'post_author', $rider_first_blog )); ?></a></li>                                                                                                                      
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 latest-blog-right">
                            <div class="latest-blog">
                            <?php
							 $rider_home_second_url = wp_get_attachment_image_src( get_post_thumbnail_id($rider_second_blog), 'rider-blog-two' );
							 if(!empty($rider_home_second_url)) { ?><a href="<?php echo esc_url(get_permalink($rider_second_blog)); ?>"> <img src="<?php echo esc_url( $rider_home_second_url[0] ); ?>" width="<?php echo $rider_home_second_url[1]; ?>" height="<?php echo $rider_home_second_url[2]; ?>" alt="<?php echo esc_attr( get_the_title($rider_second_blog) ); ?>" class="img-responsive"> </a><?php } ?>
                                <div class="blog-info">
                                    <div class="blog-date">
                                        <a href="<?php echo get_month_link(get_the_time('Y',$rider_second_blog),get_the_time('m',$rider_second_blog)); ?>" class="color-text"> 
                                            <b><?php echo get_the_date('d',$rider_second_blog); ?></b>
                                            <span><?php echo get_the_time('M',$rider_second_blog).' '.get_the_time('y',$rider_second_blog); ?></span>
                                        </a>
                                    </div>
                                    <div class="blog-meta">
                                        <a class="blog-title" href="<?php echo esc_url(get_permalink($rider_second_blog)); ?>"><?php echo get_the_title($rider_second_blog); ?></a>
                                        <ul>
                                            <li> <span> <?php echo get_comments_number( $rider_second_blog ); ?> </span> <?php _e('Comments','rider'); ?></li>  
                                            <li><span> <?php _e('Posted By','rider'); ?>: </span><a href="<?php echo esc_url( get_author_posts_url(get_post_field( 'post_author', $rider_second_blog ))); ?>"><?php echo get_the_author_meta('user_login',get_post_field( 'post_author', $rider_second_blog )); ?></a></li>                                                                                                                      
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class=" latest-blog">
                                <?php
							 $rider_home_third_url = wp_get_attachment_image_src( get_post_thumbnail_id($rider_third_blog), 'rider-blog-two' );
							 if(!empty($rider_home_third_url)) { ?><a href="<?php echo esc_url(get_permalink($rider_third_blog)); ?>"> <img src="<?php echo esc_url( $rider_home_third_url[0] ); ?>" width="<?php echo $rider_home_third_url[1]; ?>" height="<?php echo $rider_home_third_url[2]; ?>" alt="<?php echo esc_attr( get_the_title($rider_third_blog) ); ?>" class="img-responsive"> </a><?php } ?>
                                <div class="blog-info">
                                    <div class="blog-date">
                                        <a href="<?php echo get_month_link(get_the_time('Y',$rider_third_blog),get_the_time('m',$rider_third_blog)); ?>" class="color-text"> 
                                            <b><?php echo get_the_date('d',$rider_third_blog); ?></b>
                                            <span><?php echo get_the_time('M',$rider_third_blog).' '.get_the_time('y',$rider_third_blog); ?></span>
                                        </a>
                                    </div>
                                    <div class="blog-meta">
                                        <a class="blog-title" href="<?php echo esc_url(get_permalink($rider_third_blog)); ?>"><?php echo get_the_title($rider_third_blog); ?></a>
                                        <ul>
                                            <li> <span> <?php echo get_comments_number( $rider_third_blog ); ?> </span> <?php _e('Comments','rider'); ?></li>  
                                            <li><span> <?php _e('Posted By','rider'); ?>: </span><a href="<?php echo esc_url( get_author_posts_url(get_post_field( 'post_author', $rider_third_blog ))); ?>"><?php echo get_the_author_meta('user_login',get_post_field( 'post_author', $rider_third_blog )); ?></a></li>                                                                                                                      
                                        </ul>
                                    </div>
                                </div>
                            </div>            
                        </div>    
                    </div>
                </div>
            </div>
            <!--latest-blog end-->

        </section>
<?php get_footer(); ?>		
