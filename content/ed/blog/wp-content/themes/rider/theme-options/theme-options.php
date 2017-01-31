<?php

function rider_options_init() {
    register_setting('rider_option', 'rider_theme_options', 'rider_option_validate');
}

add_action('admin_init', 'rider_options_init');

function rider_option_validate($input) {
    $input['rider_logo'] = esc_url_raw($input['rider_logo']);
    $input['rider_menu-logo'] = esc_url_raw($input['rider_menu-logo']);
    $input['rider_favicon'] = esc_url_raw($input['rider_favicon']);
    $input['rider_blogtitle'] = sanitize_text_field($input['rider_blogtitle']);

    $input['rider_headertop-bg'] = esc_url_raw($input['rider_headertop-bg']);

    $input['rider_footer-logo'] = esc_url_raw($input['rider_footer-logo']);
    $input['rider_footerdescription'] = sanitize_text_field($input['rider_footerdescription']);
    $input['rider_footertext'] = sanitize_text_field($input['rider_footertext']);

    $input['rider_fburl'] = esc_url_raw($input['rider_fburl']);
    $input['rider_twitter'] = esc_url_raw($input['rider_twitter']);
    $input['rider_rss'] = esc_url_raw($input['rider_rss']);
    $input['rider_youtube'] = esc_url_raw($input['rider_youtube']);

    $input['rider_aboutus-title'] = sanitize_text_field($input['rider_aboutus-title']);
    $input['rider_aboutus-name'] = sanitize_text_field($input['rider_aboutus-name']);
    $input['rider_author-image'] = esc_url_raw($input['rider_author-image']);
    $input['rider_author-link'] = esc_url_raw($input['rider_author-link']);
    $input['rider_author-location'] = sanitize_text_field($input['rider_author-location']);

    $input['rider_blog-title'] = sanitize_text_field($input['rider_blog-title']);

    return $input;
}

function rider_framework_load_scripts() {
    wp_enqueue_media();
    wp_enqueue_style('rider-framework', get_template_directory_uri() . '/theme-options/css/rider_framework.css', false, '1.0.0');
    wp_enqueue_script('rider-options-custom', get_template_directory_uri() . '/theme-options/js/rider-custom.js', array('jquery'));
    wp_enqueue_script('rider-media-uploader', get_template_directory_uri() . '/theme-options/js/media-uploader.js', array('jquery'));
}

add_action('admin_enqueue_scripts', 'rider_framework_load_scripts');

function rider_framework_menu_settings() {
    $rider_menu = array(
        'page_title' => __('Rider Theme Options', 'rider'),
        'menu_title' => __('Theme Options', 'rider'),
        'capability' => 'edit_theme_options',
        'menu_slug' => 'rider_framework',
        'callback' => 'rider_framework_page'
    );
    return apply_filters('rider_framework_menu', $rider_menu);
}

add_action('admin_menu', 'rider_theme_options_add_page');

function rider_theme_options_add_page() {
    $rider_menu = rider_framework_menu_settings();
    add_theme_page($rider_menu['page_title'], $rider_menu['menu_title'], $rider_menu['capability'], $rider_menu['menu_slug'], $rider_menu['callback']);
}

function rider_framework_page() {
    //   global $select_options;
    if (!isset($_REQUEST['settings-updated']))
        $_REQUEST['settings-updated'] = false;
    ?>
    <div class="rider-themes">
        <form method="post" action="options.php" id="form-option" class="theme_option_ft">
            <div class="rider-header">
                <div class="logo">
                    <?php
                    $rider_image = get_template_directory_uri() . '/theme-options/images/logo.png';
                    echo "<a href='http://fasterthemes.com' target='_blank'><img src='" . esc_url($rider_image) . "' alt='" . __('FasterThemes', 'rider') . "'  /></a>";
                    ?>
                </div>
                <div class="header-right">
                    <h1><?php _e('Theme Options', 'rider'); ?></h1>
                    <div class='btn-save'><input type='submit' class='button-primary' value='<?php _e('Save Options', 'rider'); ?>' />
                    </div>
                </div>
            </div>
            <div class="rider-details">
                <div class="rider-options">
                    <div class="right-box">
                        <div class="nav-tab-wrapper">
                            <ul>
                                <li><a id="options-group-1-tab" class="nav-tab basicsettings-tab" title="<?php _e('Basic Settings', 'rider'); ?>" href="#options-group-1"><?php _e('Basic Settings', 'rider'); ?></a></li>
                                <li><a id="options-group-2-tab" class="nav-tab headersettings-tab" title="<?php _e('Header Settings', 'rider'); ?>" href="#options-group-2"><?php _e('Header Settings', 'rider'); ?></a></li>
                                <li><a id="options-group-3-tab" class="nav-tab footersettings-tab" title="<?php _e('Footer Settings', 'rider'); ?>" href="#options-group-3"><?php _e('Footer Settings', 'rider'); ?></a></li>
                                <li><a id="options-group-4-tab" class="nav-tab socialsettings-tab" title="<?php _e('Social Settings', 'rider'); ?>" href="#options-group-4"><?php _e('Social Settings', 'rider'); ?></a></li>
                                <li><a id="options-group-5-tab" class="nav-tab socialsettings-tab" title="<?php _e('Home Settings', 'rider'); ?>" href="#options-group-5"><?php _e('Home Settings', 'rider'); ?></a></li>
                                <li><a id="options-group-6-tab" class="nav-tab profeatures-tab" title="<?php _e('Pro Theme Features', 'rider'); ?>" href="#options-group-6"><?php _e('Pro Theme Features', 'rider'); ?></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="right-box-bg"></div>
                    <div class="postbox left-box">
                        <!--======================== F I N A L - - T H E M E - - O P T I O N ===================-->
                        <?php
                        settings_fields('rider_option');
                        $rider_options = get_option('rider_theme_options');
                        ?>
                        <!-------------- Basic Settings group ----------------->
                        <div id="options-group-1" class="group basicsettings rider-inner-tabs">
                            <div class="section theme-tabs theme-logo">
                                <a class="heading rider-inner-tab active" href="javascript:void(0)"><?php _e('Site Logo (Recommended Size : 230px * 220px)', 'rider'); ?></a>
                                <div class="rider-inner-tab-group active">
                                    <div class="explain"><?php _e('Size of Logo should be exactly 230x220px for best results.', 'rider'); ?></div>
                                    <div class="ft-control">
                                        <input id="rider_logo-img" class="upload" type="text" name="rider_theme_options[rider_logo]"
                                               value="<?php
                                               if (!empty($rider_options['rider_logo'])) {
                                                   echo esc_attr($rider_options['rider_logo']);
                                               }
                                               ?>" placeholder="<?php _e('No file chosen', 'rider'); ?>" readonly />
                                        <input id="upload_image_button" class="upload-button button" type="button" value="<?php _e('Upload', 'rider'); ?>" />
                                        <div class="screenshot" id="rider_logo-image">
                                            <?php if (!empty($rider_options['rider_logo'])) { ?>
                                                <img src="<?php echo esc_url($rider_options['rider_logo']) ?>" alt="<?php _e('rider_logo', 'rider'); ?>" />
                                                <a class='remove-image'> </a>
    <?php } ?>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="section theme-tabs theme-logo">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Menu Logo (Recommended Size : 190px * 25px)', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="explain"><?php _e('Size of Logo should be exactly 190x25px for best results.', 'rider'); ?></div>
                                    <div class="ft-control">
                                        <input id="menu-logo-img" class="upload" type="text" name="rider_theme_options[rider_menu-logo]"
                                               value="<?php
    if (!empty($rider_options['rider_menu-logo'])) {
        echo esc_attr($rider_options['rider_menu-logo']);
    }
    ?>" placeholder="<?php _e('No file chosen', 'rider'); ?>" readonly />
                                        <input id="upload_image_button" class="upload-button button" type="button" value="<?php _e('Upload', 'rider'); ?>" />
                                        <div class="screenshot" id="logo-image">
    <?php if (!empty($rider_options['rider_menu-logo'])) { ?>
                                                <img src="<?php echo esc_url($rider_options['rider_menu-logo']) ?>" alt="<?php _e('menu-logo', 'rider'); ?>" />
                                                <a class='remove-image'> </a>
    <?php } ?>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="section theme-tabs theme-favicon">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Favicon (Recommended Size : 32px * 32px)', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="explain"><?php _e('Size of favicon should be exactly 32x32px for best results.', 'rider'); ?></div>
                                    <div class="ft-control">
                                        <input id="favicon-img" class="upload" type="text" name="rider_theme_options[rider_favicon]"
                                               value="<?php
                                            if (!empty($rider_options['rider_favicon'])) {
                                                echo esc_attr($rider_options['rider_favicon']);
                                            }
                                            ?>" placeholder="<?php _e('No file chosen', 'rider'); ?>" readonly />
                                        <input id="upload_image_button1" class="upload-button button" type="button" value="<?php _e('Upload', 'rider'); ?>" />
                                        <div class="screenshot" id="favicon-image">
    <?php if (!empty($rider_options['rider_favicon'])) { ?>
                                                <img src="<?php echo esc_url($rider_options['rider_favicon']) ?>" alt="<?php _e('favicon', 'rider'); ?>" />	<a class='remove-image'> </a>
    <?php } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="section-blogtitle" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Blog Title', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <input type="text" id="rider_blogtitle" class="of-input" name="rider_theme_options[rider_blogtitle]" maxlength="30" size="32"  value="<?php
    if (!empty($rider_options['rider_blogtitle'])) {
        echo esc_attr($rider_options['rider_blogtitle']);
    }
    ?>">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-------------- Header Settings group ----------------->
                        <div id="options-group-2" class="group headersettings rider-inner-tabs">
                            <div id="rider_headertop-bg" class="section theme-tabs active">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Header Backgroung Image (Recommended Size : 1350px * 667px)', 'rider'); ?></a>
                                <div class="rider-inner-tab-group active">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('Size of Logo should be exactly 1350x667px for best results.', 'rider'); ?></div>
                                        <input id="rider_headertop-bg" class="upload" type="text" name="rider_theme_options[rider_headertop-bg]"
                                               value="<?php
                                        if (!empty($rider_options['rider_headertop-bg'])) {
                                            echo esc_attr($rider_options['rider_headertop-bg']);
                                        }
                                        ?>" placeholder="<?php _e('No file chosen', 'rider'); ?>" readonly/>
                                        <input id="upload_image_button" class="upload-button button" type="button" value="<?php _e('Upload', 'rider'); ?>" />
                                        <div class="screenshot" id="rider_headertop-bg">
    <?php
    if (!empty($rider_options['rider_headertop-bg'])) {
        echo "<img src='" . esc_url($rider_options['rider_headertop-bg']) . "' /><a class='remove-image'></a>";
    }
    ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-------------- Footer Settings group ----------------->
                        <div id="options-group-3" class="group footersettings rider-inner-tabs">
                            <div class="section theme-tabs theme-logo">
                                <a class="heading rider-inner-tab active" href="javascript:void(0)"><?php _e('Footer Logo (Recommended Size : 190px * 25px)', 'rider'); ?></a>
                                <div class="rider-inner-tab-group active">
                                    <div class="explain"><?php _e('Size of Logo should be exactly 190x25px for best results.', 'rider'); ?></div>
                                    <div class="ft-control">
                                        <input id="rider_footer-logo-img" class="upload" type="text" name="rider_theme_options[rider_footer-logo]"
                                               value="<?php
    if (!empty($rider_options['rider_footer-logo'])) {
        echo esc_attr($rider_options['rider_footer-logo']);
    }
    ?>" placeholder="<?php _e('No file chosen', 'rider'); ?>" readonly/>
                                        <input id="upload_image_button" class="upload-button button" type="button" value="<?php _e('Upload', 'rider'); ?>" />
                                        <div class="screenshot" id="logo-image">
                                            <?php if (!empty($rider_options['rider_footer-logo'])) { ?>
                                                <img src="<?php echo esc_url($rider_options['rider_footer-logo']) ?>" alt="<?php _e('rider_footer-logo', 'rider'); ?>" />
                                                <a class='remove-image'> </a>
    <?php } ?>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="section-footertext" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Short Description', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('100 words short description to display in the footer.', 'rider'); ?></div>
                                        <textarea name="rider_theme_options[rider_footerdescription]"><?php
                                           if (!empty($rider_options['rider_footerdescription'])) {
                                               echo sanitize_text_field($rider_options['rider_footerdescription']);
                                           }
                                           ?></textarea>
                                    </div>
                                </div>
                            </div>
                            <div id="section-footertext" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Copyright Text', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('Some text regarding copyright of your site, you would like to display in the footer.', 'rider'); ?></div>
                                        <input type="text" id="rider_footertext" class="of-input" maxlength="100" name="rider_theme_options[rider_footertext]" size="32"  value="<?php
                                                                                                                                                                      if (!empty($rider_options['rider_footertext'])) {
                                                                                                                                                                          echo esc_html(sanitize_text_field($rider_options['rider_footertext']));
                                                                                                                                                                      }
                                                                                                                                                                      ?>">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-------------- Social Settings group ----------------->
                        <div id="options-group-4" class="group socialsettings rider-inner-tabs">
                            <div id="section-facebook" class="section theme-tabs">
                                <a class="heading rider-inner-tab active" href="javascript:void(0)"><?php _e('Facebook', 'rider'); ?></a>
                                <div class="rider-inner-tab-group active">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('Facebook profile or page URL ', 'rider'); ?>i.e. http://facebook.com/username/ </div>      	<input id="facebook" class="of-input" name="rider_theme_options[rider_fburl]" size="30" type="text" value="<?php
                                                                                                                                                                      if (!empty($rider_options['rider_fburl'])) {
                                                                                                                                                                          echo esc_attr($rider_options['rider_fburl']);
                                                                                                                                                                      }
                                                                                                                                                                      ?>" />
                                    </div>
                                </div>
                            </div>
                            <div id="section-twitter" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Twitter', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('Twitter profile or page URL ', 'rider'); ?>i.e. http://www.twitter.com/username/</div>
                                        <input id="twitter" class="of-input" name="rider_theme_options[rider_twitter]" type="text" size="30" value="<?php
                                                                                                                                                                      if (!empty($rider_options['rider_twitter'])) {
                                                                                                                                                                          echo esc_attr($rider_options['rider_twitter']);
                                                                                                                                                                      }
    ?>" />
                                    </div>
                                </div>
                            </div>
                            <div id="section-youtube" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Youtube', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('youtube profile or page URL ', 'rider'); ?>i.e. https://youtube.com/username/</div>
                                        <input id="youtube" class="of-input" name="rider_theme_options[rider_youtube]" type="text" size="30" value="<?php
                                    if (!empty($rider_options['rider_youtube'])) {
                                        echo esc_attr($rider_options['rider_youtube']);
                                    }
    ?>" />
                                    </div>
                                </div>
                            </div>
                            <div id="section-rss" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('RSS', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('RSS profile or page URL ', 'rider'); ?>i.e. https://www.rss.com/username/</div>
                                        <input id="rss" class="of-input" name="rider_theme_options[rider_rss]" type="text" size="30" value="<?php
                                        if (!empty($rider_options['rider_rss'])) {
                                            echo esc_attr($rider_options['rider_rss']);
                                        }
                                        ?>" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-------------- Home Page Settings group ----------------->
                        <div id="options-group-5" class="group homesettings rider-inner-tabs">
                            <div id="button-title" class="section theme-tabs active">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('About Us', 'rider'); ?></a>
                                <div class="rider-inner-tab-group active">
                                    <div class="ft-control">
                                        <input id="aboutus-title" class="of-input" maxlength="30" name="rider_theme_options[rider_aboutus-title]" type="text" size="46" value="<?php
                                        if (!empty($rider_options['rider_aboutus-title'])) {
                                            echo esc_attr($rider_options['rider_aboutus-title']);
                                        }
                                        ?>"  placeholder="<?php _e('About Us', 'rider'); ?>" />
                                    </div>
                                </div>
                            </div>

                            <div id="button-title" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Author Name', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <input id="aboutus-name" class="of-input" maxlength="30" name="rider_theme_options[rider_aboutus-name]" type="text" size="46" value="<?php
                                        if (!empty($rider_options['rider_aboutus-name'])) {
                                            echo esc_attr($rider_options['rider_aboutus-name']);
                                        }
                                        ?>"  placeholder="<?php _e('Author Name', 'rider'); ?>" />
                                    </div>
                                </div>
                            </div>

                            <div id="rider_author-image" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Author Image (Recommended Size : 159px * 159px)', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <div class="explain"><?php _e('Author image should be exactly 159x159px for best results.', 'rider'); ?></div>
                                        <input id="rider_author-image" class="upload" type="text" name="rider_theme_options[rider_author-image]"
                                               value="<?php
                                    if (!empty($rider_options['rider_author-image'])) {
                                        echo esc_attr($rider_options['rider_author-image']);
                                    }
                                    ?>" placeholder="<?php _e('No file chosen', 'rider'); ?>" readonly/>
                                        <input id="upload_image_button" class="upload-button button" type="button" value="<?php _e('Upload', 'rider'); ?>" />
                                        <div class="screenshot" id="rider_author-image-image">
                                        <?php if (!empty($rider_options['rider_author-image'])) { ?>
                                                <img src="<?php echo esc_url($rider_options['rider_author-image']) ?>" alt="<?php _e('author-image', 'rider'); ?>" />
                                                <a class='remove-image'> </a>
                                        <?php } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="button-title" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Author Link', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <input id="rider_author-link" class="of-input" maxlength="30" name="rider_theme_options[rider_author-link]" type="text" size="46" value="<?php
                                    if (!empty($rider_options['rider_author-link'])) {
                                        echo esc_attr($rider_options['rider_author-link']);
                                    }
                                    ?>"  placeholder="<?php _e('Author Link', 'rider'); ?>" />
                                    </div>
                                </div>
                            </div>
                            <div id="button-title" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Author Location', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <input id="author-location" class="of-input" maxlength="30" name="rider_theme_options[rider_author-location]" type="text" size="46" value="<?php
                                    if (!empty($rider_options['rider_author-location'])) {
                                        echo esc_html($rider_options['rider_author-location']);
                                    }
                                    ?>"  placeholder="<?php _e('Author Location', 'rider'); ?>" />
                                    </div>
                                </div>
                            </div>
                            <div class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Short Description', 'rider'); ?> </a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
    <?php
    $rider_content = '';
    if (!empty($rider_options['rider_homemsg'])) {
        $rider_content = wpautop($rider_options['rider_homemsg']);
    }
    $rider_editor_id = 'rider_homemsg';
    $rider_settings = array(
        'textarea_name' => 'rider_theme_options[rider_homemsg]',
        'textarea_rows' => 20,
        'media_buttons' => false
    );
    wp_editor($rider_content, $rider_editor_id, $rider_settings);
    ?>
                                    </div>
                                </div>
                            </div>
                            <div id="button-title" class="section theme-tabs">
                                <a class="heading rider-inner-tab" href="javascript:void(0)"><?php _e('Blog Title', 'rider'); ?></a>
                                <div class="rider-inner-tab-group">
                                    <div class="ft-control">
                                        <input id="blog-title" class="of-input" maxlength="30" name="rider_theme_options[rider_blog-title]" type="text" size="46" value="<?php
    if (!empty($rider_options['rider_blog-title'])) {
        echo esc_attr($rider_options['rider_blog-title']);
    }
    ?>"  placeholder="<?php _e('Blog Title', 'rider'); ?>" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-------------- fourth group ----------------->
                        <div id="options-group-6" class="group theme-pro-image rider-inner-tabs">
                            <div class="theme-pro-header">
                                <img src="<?php echo get_template_directory_uri(); ?>/theme-options/images/theme-logo.png" class="theme-pro-logo" />
                                <a href="http://fasterthemes.com/wordpress-themes/Rider" target="_blank" class="theme-pro-buynow"><img src="<?php echo get_template_directory_uri(); ?>/theme-options/images/buy-now.png" /></a>
                            </div>
                            <img src="<?php echo get_template_directory_uri(); ?>/theme-options/images/pro-featured.png" />
                        </div>
                        <!--======================== F I N A L - - T H E M E - - O P T I O N S ===================-->
                    </div>
                </div>
            </div>
            <div class="rider-footer">
                <ul>
                    <li class="btn-save"><input type="submit" class="button-primary" value="<?php _e('Save Options', 'rider'); ?>" /></li>
                </ul>
            </div>
        </form>
    </div>
    <div class="save-options"><h2><?php _e('Options saved successfully', 'rider'); ?>.</h2></div>
<?php } ?>
