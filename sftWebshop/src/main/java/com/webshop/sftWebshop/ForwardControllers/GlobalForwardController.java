package com.webshop.sftWebshop.ForwardControllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GlobalForwardController {

    @GetMapping("/")
   public String showDashboard(){
       return "dashboard.html";
   }
}
