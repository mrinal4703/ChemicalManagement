    package com.example.chem_manage.User;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @CrossOrigin("https://localhost:3000")
    public class UserController {
        private UserRepository userRepository;
        @Autowired
        public UserController(UserRepository userRepository){
            this.userRepository = userRepository;
        }

        @PostMapping("/newuser")
        public User newMessage(@RequestBody User newUser) {
            System.out.println("Received new user request: " + newUser.toString());

            try {
                User savedUser = userRepository.save(newUser);
                System.out.println("Saved user: " + savedUser.toString());
                return savedUser;
            } catch (Exception e) {
                System.err.println("Error saving user: " + e.getMessage());
                e.printStackTrace();
                throw e; // Rethrow the exception or handle it appropriately
            }
        }


        @PostMapping("/login")
        public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
            User user = userRepository.findByEmail(loginUser.getEmail());

            if (user == null || !user.getPassword().equals(loginUser.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }

            return ResponseEntity.ok(user);
        }

        @GetMapping("/userseemsan")
        public ResponseEntity<List<User>> getUsers() {
            List<User> users = userRepository.findUsersByRankkNotInRawMaterialsAndCompany();
            return ResponseEntity.ok(users);
        }
        @GetMapping("/userswithcompanyorders")
        public ResponseEntity<List<Object[]>> getUsersWithCompanyOrders() {
            List<Object[]> users = userRepository.findAllUsersWithCompanyOrders();
            return ResponseEntity.ok(users);
        }
        @GetMapping("/userswithrawmaterialsprovider")
        public ResponseEntity<List<Object[]>> getUsersWithRawMaterialsProvider() {
            List<Object[]> users = userRepository.findAllUsersWithRawMaterialProvider();
            return ResponseEntity.ok(users);
        }
    }
