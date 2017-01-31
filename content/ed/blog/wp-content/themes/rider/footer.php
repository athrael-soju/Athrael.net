<?php
/**
 * The Footer template file
 */
 $rider_options = get_option( 'rider_theme_options' );
?>
<footer>
            <div class="footer-bg">
                <div class="royals-container  container">
                    <div class="footer-logo">
                        <?php if(!empty($rider_options['rider_footer-logo'])) { $rider_logo_details = getimagesize($rider_options['rider_footer-logo']);?>
							<a href="<?php echo esc_url( home_url('/') ); ?>">
                                <img alt="<?php _e('logo','rider'); ?>" src="<?php echo esc_url( $rider_options['rider_footer-logo'] ); ?>" class="img-responsive"  height="<?php echo $rider_logo_details[1]; ?>" width="<?php echo $rider_logo_details[0]; ?>" />
                            </a>
							<?php } ?>
                    </div>
                    <div class="footer-text">
						<?php if(!empty($rider_options['rider_footerdescription'])) { ?><p class="text-widget"><?php echo wp_trim_words( esc_html($rider_options['rider_footerdescription']), 100, '' );?></p><?php } ?>
                        <div class="footer-social-icon">
                            <ul>
                                <?php if(!empty($rider_options['rider_twitter'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_twitter']); ?>" class="twitter-icon"> <span class="fa fa-twitter"></span> </a> </li><?php } ?>
                                <?php if(!empty($rider_options['rider_fburl'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_fburl']); ?>" class="facebook-icon"> <span class="fa fa-facebook"></span> </a> </li><?php } ?>
                            </ul>
                        </div>
                        <div class="copyright">  
							
                            <p>
								<?php if(!empty($rider_options['rider_footertext'])) { ?><?php echo esc_html($rider_options['rider_footertext']);?><?php } ?>
							<?php
						 printf( __( 'Powered by %1$s and %2$s.', 'rider' ), '<a href="https://wordpress.org/" target="_blank">WordPress</a>', '<a href="http://fasterthemes.com/wordpress-themes/rider" target="_blank">Rider</a>' );	
						 ?>
                            </p>
                        </div>
                    </div>
                </div>              
            </div>
        </footer>
		<?php wp_footer(); ?>
        <!--==============================Footer end=================================-->
    </body>
</html>
