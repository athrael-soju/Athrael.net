<?php
/**
 * The Header template file
 */
 $rider_options = get_option( 'rider_theme_options' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
        <!--[if lt IE 9]>
        <script src="<?php echo esc_url(get_template_directory_uri()); ?>/js/html5.js"></script>
        <![endif]-->
		<?php if (!empty($rider_options['rider_favicon'])) { ?>
            <link rel="shortcut icon" href="<?php echo esc_url($rider_options['rider_favicon']); ?>"> 
        <?php } ?>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
	<?php if (is_page_template('page-templates/home-page.php')) { ?>
        <header>
            <div class="header_bg">
                <span class="mask-overlay"></span>
                <div class="royals-container container">
                    <div class="royal-rides-header col-md-12">
                        <div class="logo">
							<?php if(!empty($rider_options['rider_logo'])) { $rider_logo_details = getimagesize($rider_options['rider_logo']);?>
							<a href="<?php echo esc_url( home_url('/') ); ?>">
                                <img alt="<?php _e('logo','rider'); ?>" src="<?php echo esc_url( $rider_options['rider_logo'] ); ?>" class="img-responsive" height="<?php echo $rider_logo_details[1]; ?>" width="<?php echo $rider_logo_details[0]; ?>" >
                            </a>
							<?php } else { ?>
								<h1>
								<a class="home-link" style="color:#<?php echo get_header_textcolor(); ?>!important;" href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home">
							<?php bloginfo('name'); ?>
						</a></h1>
						<?php	$rider_description = get_bloginfo( 'description', 'display' );
							if ( $rider_description || is_customize_preview() ) : ?>
								<p class="site-description"><?php echo $rider_description; ?></p>
							<?php endif;?>	
                            
							<?php } ?>
                        </div>
                        <div class="menu-bar col-md-10 col-md-offset-1">
							 <?php
                                if (has_nav_menu('primary')) {
									$rider_defaults = array(
										'theme_location' => 'primary',
										'container' => 'div',
										'container_class' => 'collapse navbar-collapse main-menu-ul no-padding top-menu',
										'container_id' => 'example-navbar-collapse',
										'menu_class' => '',
										'menu_id' => '',
										'submenu_class' => '',
										'echo' => true,
										'before' => '',
										'after' => '',
										'link_before' => '',
										'link_after' => '',
										'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
										'depth' => 0,
										'walker' => ''
									);
									wp_nav_menu($rider_defaults);
                                }
							?>
                        </div>
                        <div class="social-icon">
                            <ul>
                                <?php if(!empty($rider_options['rider_fburl'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_fburl']); ?>" target="_blank"> <span class="fa fa-facebook"></span> </a> </li><?php } ?>
                                <?php if(!empty($rider_options['rider_twitter'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_twitter']); ?>" target="_blank"> <span class="fa fa-twitter"></span> </a> </li><?php } ?>
                                <?php if(!empty($rider_options['rider_youtube'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_youtube']); ?>" target="_blank"> <span class="fa fa-youtube"></span> </a> </li><?php } ?>
                                <?php if(!empty($rider_options['rider_rss'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_rss']); ?>" target="_blank"> <span class="fa fa-rss"></span> </a> </li><?php } ?>
                            </ul>
                        </div> 
                        <div class="down-arrow">
                            <a href="javascript:void(0);" class="arrow bounce"><span class="fa fa-angle-down"></span></a>       
                        </div>

                    </div>
                </div>
            </div>
            <div class="scrolling-menubar"  >
                <div class="scroll-header" id="myId">
                    <span class="mask-overlay"></span>
                    <div class="royals-container  container">
                        <div class="row">
                            <div class="col-md-2 logo-small col-sm-12">
							<?php if(!empty($rider_options['rider_menu-logo'])) { $rider_logo_details = getimagesize($rider_options['rider_menu-logo']);?>
							<a href="<?php echo esc_url( home_url('/') ); ?>">
                                <img alt="<?php _e('logo','rider'); ?>" src="<?php echo esc_url( $rider_options['rider_menu-logo'] ); ?>" class="img-responsive" height="<?php echo $rider_logo_details[1]; ?>" width="<?php echo $rider_logo_details[0]; ?>" >
                            </a>
							<?php } else { ?>
                            <h1>
								<a class="home-link" style="color:#<?php echo get_header_textcolor(); ?>!important;" href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home">
								<?php bloginfo('name'); ?>
								</a></h1>
									<?php	$rider_description = get_bloginfo( 'description', 'display' );
								if ( $rider_description || is_customize_preview() ) : ?>
									<p class="site-description"><?php echo $rider_description; ?></p>
								<?php endif;?>	
							
							<?php } ?>
                            </div>
                            <div class="col-md-10 center-content">
                                <div class="scroll-menu-bar col-sm-9 col-md-9"> 
                                    <div class="navbar-header res-nav-header toggle-respon">
                                        <button type="button" class="navbar-toggle menu_toggle" data-toggle="collapse" data-target="#example-navbar-collapse1">
                                            <span class="sr-only"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                        </button>
                                    </div>
									<?php
										if (has_nav_menu('primary')) {
											$rider_defaults = array(
												'theme_location' => 'primary',
												'container' => 'div',
												'container_class' => 'collapse navbar-collapse main-menu-ul no-padding top-menu',
												'container_id' => 'example-navbar-collapse1',
												'menu_class' => '',
												'menu_id' => '',
												'submenu_class' => '',
												'echo' => true,
												'before' => '',
												'after' => '',
												'link_before' => '',
												'link_after' => '',
												'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
												'depth' => 0,
												'walker' => ''
											);
											wp_nav_menu($rider_defaults);
										}
									?>     
                                </div>
                                <div class="col-md-3 col-sm-3 social-icon  no-padding">	
                                    <ul>
                                        <?php if(!empty($rider_options['rider_fburl'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_fburl']); ?>" class="facebook-icon" target="_blank"> <span class="fa fa-facebook"></span> </a> </li><?php } ?>
                                        <?php if(!empty($rider_options['rider_twitter'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_twitter']); ?>" class="twitter-icon" target="_blank"> <span class="fa fa-twitter"></span> </a> </li><?php } ?>
                                        <?php if(!empty($rider_options['rider_youtube'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_youtube']); ?>" class="youtube-icon" target="_blank"> <span class="fa fa-youtube"></span> </a> </li><?php } ?>
                                        <?php if(!empty($rider_options['rider_rss'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_rss']); ?>" class="rss-icon" target="_blank"> <span class="fa fa-rss"></span> </a> </li><?php } ?>
                                    </ul>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>
        </header>
	<?php } else { ?>
		<header> 
            <div class="scroll-header" id="myId">
                <span class="mask-overlay"></span>
                <div class="royals-container  container">
                    <div class="row">
                        <div class="col-md-2 logo-small col-sm-12">
								<?php if(!empty($rider_options['rider_menu-logo'])) { $rider_logo_details = getimagesize($rider_options['rider_menu-logo']);?>
								<a href="<?php echo esc_url( home_url('/') ); ?>">
	                                <img alt="<?php _e('logo','rider'); ?>" src="<?php echo esc_url( $rider_options['rider_menu-logo'] ); ?>" class="img-responsive" height="<?php echo $rider_logo_details[1]; ?>" width="<?php echo $rider_logo_details[0]; ?>" >
	                            </a>
							<?php } else { ?>
                            <h1>
								<a class="home-link" style="color:#<?php echo get_header_textcolor(); ?>!important;" href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_attr(get_bloginfo('name', 'display')); ?>" rel="home">
							<?php bloginfo('name'); ?>	
						</a></h1>
						<?php	$rider_description = get_bloginfo( 'description', 'display' );
					if ( $rider_description || is_customize_preview() ) : ?>
						<p class="site-description"><?php echo $rider_description; ?></p>
					<?php endif;?>	
							
								
							<?php } ?>
                        </div>
                        <?php if (get_header_image()) { ?>
	<div class="custom-header-img">
		<a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
			<img src="<?php header_image(); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
		</a>
	</div>
<?php } ?> 
                        <div class="col-md-10 center-content">
                            <div class="scroll-menu-bar col-sm-9 col-md-9"> 
                                <div class="navbar-header res-nav-header toggle-respon">
                                    <button type="button" class="navbar-toggle menu_toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
                                        <span class="sr-only"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
								<?php
										if (has_nav_menu('primary')) {
											$rider_defaults = array(
												'theme_location' => 'primary',
												'container' => 'div',
												'container_class' => 'collapse navbar-collapse main-menu-ul no-padding top-menu',
												'container_id' => 'example-navbar-collapse',
												'menu_class' => '',
												'menu_id' => '',
												'submenu_class' => '',
												'echo' => true,
												'before' => '',
												'after' => '',
												'link_before' => '',
												'link_after' => '',
												'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
												'depth' => 0,
												'walker' => ''
											);
											wp_nav_menu($rider_defaults);
										}
									?>      
                            </div>
                            <div class="col-md-3 col-sm-3 social-icon  no-padding">	
                                <ul>
                                    <?php if(!empty($rider_options['rider_fburl'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_fburl']); ?>" class="facebook-icon" target="_blank"> <span class="fa fa-facebook"></span> </a> </li><?php } ?>
                                        <?php if(!empty($rider_options['rider_twitter'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_twitter']); ?>" class="twitter-icon" target="_blank"> <span class="fa fa-twitter"></span> </a> </li><?php } ?>
                                        <?php if(!empty($rider_options['rider_youtube'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_youtube']); ?>" class="youtube-icon" target="_blank"> <span class="fa fa-youtube"></span> </a> </li><?php } ?>
                                        <?php if(!empty($rider_options['rider_rss'])) { ?><li> <a href="<?php echo esc_url($rider_options['rider_rss']); ?>" class="rss-icon" target="_blank"> <span class="fa fa-rss"></span> </a> </li><?php } ?>
                                </ul>
                            </div>
                        </div>                           
                    </div>                  
                </div>
            </div>
        </header>
	<?php } ?>

