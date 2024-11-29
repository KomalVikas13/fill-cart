package com.excelr.fillcart.controller.user;

import com.excelr.fillcart.service.PaymentService;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Handle Stripe Payment Success
    @GetMapping("/payments/success")
    public String handlePaymentSuccess(@RequestParam("session_id") String sessionId) {
        try {
            // Retrieve the session from Stripe
            Session session = Session.retrieve(sessionId);

            // Use the PaymentProcessingService to process the payment
            return paymentService.processPayment(session);
        } catch (Exception e) {
            return "Error processing payment: " + e.getMessage();
        }
    }

    // Handle Stripe Payment Cancellation
    @GetMapping("/payments/cancel")
    public String handlePaymentCancel() {
        return "Payment was cancelled.";
    }
}
