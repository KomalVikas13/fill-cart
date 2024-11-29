package com.excelr.fillcart.repository;

import com.excelr.fillcart.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
