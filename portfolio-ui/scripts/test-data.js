const testMatrixData = [
    // --- CORE FLOWS (P0) ---
    { id: 'TC-01', scenario: 'Different user types login (Data Driven)', status: 'Automated', priority: 'P0', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767091213/TC01-StandardUser_BDD_4_examples_mvdte5.mp4' },
    { id: 'TC-02', scenario: 'Invalid Login Credentials (Error Validation)', status: 'Automated', priority: 'P1' },
    { id: 'TC-03', scenario: 'Adding all products to cart', status: 'Automated', priority: 'P0', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767017593/Testing_if_add_to_cart_works_on_all_product_cj3hhr.mp4' },
    { id: 'TC-04', scenario: 'Standard User Checkout E2E Flow', status: 'Automated', priority: 'P0', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767092331/Checkout_E2E_yto7pf.mp4' },
    
    // --- FUNCTIONAL VALIDATION (P1) ---
    { id: 'TC-05', scenario: 'Checkout with a single random product', status: 'Automated', priority: 'P1', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767092330/Checking_out_random_product_nde6zs.mp4' },
    { id: 'TC-06', scenario: 'Inventory Page - Product Sorting (A-Z, Z-A, Price Low-High)', status: 'Planned', priority: 'P1' },
    { id: 'TC-07', scenario: 'Cart Persistence - Items remain after Logout/Login', status: 'Planned', priority: 'P1' },
    { id: 'TC-08', scenario: 'Social Media Links - Verify Footer Redirects (Twitter/FB/LI)', status: 'Planned', priority: 'P2' },
    
    // --- FORM VALIDATIONS & ERROR HANDLING (P2) ---
    { id: 'TC-09', scenario: 'Checkout Form - Missing First Name validation', status: 'Automated', priority: 'P2', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767092331/Verifying_error_message_works_for_blank_first_name_sau4fc.mp4' },
    { id: 'TC-10', scenario: 'Checkout Form - Missing Last Name validation', status: 'Automated', priority: 'P2', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767092331/Verifying_error_message_works_for_blank_last_name_qz07qf.mp4' },
    { id: 'TC-11', scenario: 'Checkout Form - Missing Postal Code validation', status: 'Automated', priority: 'P2', videoUrl: 'https://res.cloudinary.com/dsov6zvru/video/upload/v1767092330/Verifying_error_message_works_for_blank_postal_code_fdyymn.mp4' },
    { id: 'TC-12', scenario: 'Inventory Page - Remove item via "Remove" button', status: 'In Progress', priority: 'P2' },
    { id: 'TC-13', scenario: 'Cart Page - Remove item from cart list', status: 'In Progress', priority: 'P2' },
    
    // --- NAVIGATION & CANCEL FLOWS (P2) ---
    { id: 'TC-14', scenario: 'Cart Page - Navigation back to Products via "Continue Shopping"', status: 'In Progress', priority: 'P2' },
    { id: 'TC-15', scenario: 'Checkout Info - Navigation back to Cart via "Cancel"', status: 'In Progress', priority: 'P2' },
    { id: 'TC-16', scenario: 'Checkout Overview - Navigation back to Products via "Cancel"', status: 'In Progress', priority: 'P2' },
    { id: 'TC-17', scenario: 'Sidebar - Reset App State functionality', status: 'Planned', priority: 'P2' },
    
    // --- EDGE CASES & NEGATIVE TESTING (P3) ---
    { id: 'TC-18', scenario: 'Empty Cart Checkout - Verify system prevents checkout with 0 items', status: 'Planned', priority: 'P1' },
    { id: 'TC-19', scenario: 'Direct URL Access - Attempt to access /inventory.html without login', status: 'Planned', priority: 'P1' },
    { id: 'TC-20', scenario: 'Performance Glitch User - Verify checkout completes despite delays', status: 'Planned', priority: 'P3' },
    { id: 'TC-21', scenario: 'Problem User - Validate image loading failures (Negative Test)', status: 'Planned', priority: 'P3' },
    { id: 'TC-22', scenario: 'Locked Out User - Verify specific error message for banned accounts', status: 'Planned', priority: 'P1' },
    { id: 'TC-23', scenario: 'Session Timeout - Verify user redirection after manual cookie deletion', status: 'Planned', priority: 'P2' },
    { id: 'TC-24', scenario: 'Responsiveness - Verify UI elements on Mobile Viewport sizes', status: 'Planned', priority: 'P2' },
    { id: 'TC-25', scenario: 'Checkout Completion - Verify "Back Home" returns to clean state', status: 'Planned', priority: 'P2' },
];