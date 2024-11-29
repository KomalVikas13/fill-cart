package com.excelr.fillcart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private double amount;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime paymentDate;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
