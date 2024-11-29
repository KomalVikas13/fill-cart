package com.excelr.fillcart.dto;

import lombok.Data;

@Data
public class PaymentResponse {
    private String paymentUrl;
    private String paymentId;
}
