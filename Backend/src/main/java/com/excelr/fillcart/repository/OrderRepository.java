package com.excelr.fillcart.repository;

import com.excelr.fillcart.model.Order;
import com.excelr.fillcart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o JOIN FETCH o.orderItems WHERE o.orderId = :orderId")
    Optional<Order> findByIdWithOrderItems(@Param("orderId") Long orderId);

    List<Order> findByUser(User user);
}
