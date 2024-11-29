package com.excelr.fillcart.service;

import com.excelr.fillcart.model.User;
import com.excelr.fillcart.model.UserPrincipal;
import com.excelr.fillcart.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> byEmail = repo.findByEmail(email);
        if(byEmail.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        return new UserPrincipal(byEmail.get());
    }
}
