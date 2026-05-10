
## Plan for Wig Shop and Salon Project

This plan outlines the development of a new e-commerce and salon booking platform. The frontend will be built first, followed by backend integrations as needed.

**Phase 1: Frontend Development (Lead: frontend_engineer)**

1.  **Homepage Implementation**:
    *   Design and implement the hero banner with the text "Premium Wigs + Salon Installs".
    *   Add "Shop Now" and "Book Appointment" buttons.
    *   Display a section for 4 best-selling wigs.
    *   Showcase 3 client before/after pictures.
    *   Integrate trust badges: "Paystack Secured" and "GIG Shipping".

2.  **Shop Wigs Section**:
    *   Create a product grid for displaying wigs.
    *   Implement filtering options: Length, Color, Lace Type, Price.
    *   Develop individual product pages with:
        *   Multiple product images.
        *   Product video display.
        *   Stock count information.
        *   "Add to Cart" button.
        *   Shipping calculator functionality.

3.  **Book Appointment Section**:
    *   Develop a calendar interface to display available appointment slots.
    *   List services with their prices: Install (₦15k), Revamp (₦7k), Coloring (₦20k).
    *   Implement a 50% deposit payment flow via Paystack for confirmation.

4.  **Track Order/Waybill Section**:
    *   Create an input field for customers to enter their order number.
    *   Integrate with GIG/Kwik tracking APIs to display delivery status.

5.  **Wig Subscription Section**:
    *   Design the "Wig of the Month Club" page.
    *   Display the subscription price: ₦25k/month.
    *   Clearly explain the perks of the subscription.
    *   Add a "Sign up" button.

6.  **Gallery Section**:
    *   Implement an Instagram-style grid layout for client install pictures.
    *   Link each gallery image to a "Book This Look" option, potentially pre-filling a booking form.

7.  **About + Contact Section**:
    *   Create a page detailing the salon's story.
    *   Include the salon's address in Aba.
    *   Add a WhatsApp contact button.
    *   Integrate a Google Map displaying the salon's location.

8.  **Cart & Checkout Implementation**:
    *   Develop the shopping cart interface to display selected items.
    *   Implement automatic shipping cost calculation using GIG API.
    *   Integrate payment options: Paystack and direct transfer.
    *   After successful payment, generate and display a waybill number to the customer.

**Phase 2: Backend Integration (Potentially: supabase_engineer)**

*   Investigate and implement necessary backend logic for order processing, payment handling, and subscription management.
*   Develop the password-protected Wholesale Portal with bulk pricing and MOQ (5 wigs).
*   Set up database schemas for products, orders, customers, and appointments.
*   Consider edge functions for specific backend tasks if required.

**Phase 3: Validation**

*   Once all development is complete, run `validate_build` to ensure the implementation meets the requirements.
