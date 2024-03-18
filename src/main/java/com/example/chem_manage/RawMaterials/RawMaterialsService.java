package com.example.chem_manage.RawMaterials;

public class RawMaterialsService {
//    @Autowired
//    private RawMaterialsRepository rawMaterialsRepository;
//
//    @Scheduled(fixedRate = 1000) // check every second
//    public void updateTrack() {
//        System.out.println("Executing updateTrack method...");
//        List<RawMaterials> pendingOrders = rawMaterialsRepository.findByTrack("pending");
//        Date currentTime = new Date();
//        Instant currentInstant = currentTime.toInstant();
//
//        for (RawMaterials order : pendingOrders) {
//            Instant orderInstant = order.getOrdertime().toInstant();
//            Duration duration = Duration.ofSeconds(order.getTimetaken());
//
//            Instant orderTimePlusDuration = orderInstant.plus(duration);
//
//            System.out.println("Current Time: " + currentTime);
//            System.out.println("Order Time: " + order.getOrdertime());
//            System.out.println("Order Time Plus Duration: " + orderTimePlusDuration);
//            System.out.println("Current Instant: " + currentInstant);
//
//            if (currentInstant.isAfter(orderTimePlusDuration)) {
//                System.out.println("Updating track for order: " + order.getId());
//                order.updateTrack("Ready");
//                rawMaterialsRepository.save(order);
//            }
//        }
//    }
}
