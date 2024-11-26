package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Activity;
import uitm.interntrack.service.ActivityService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

  private final ActivityService activityService;
  private final Logger logger = LoggerFactory.getLogger(ActivityController.class);

  public ActivityController(ActivityService activityService) {
    this.activityService = activityService;
  }

  @PostMapping("/create")
  public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
    var targetActivity = activityService.createActivity(activity);
    logger.info("Activity created: {}", targetActivity);
    return ResponseEntity.ok(targetActivity);
  }

  @GetMapping("/")
  public ResponseEntity<List<Activity>> getActivities() {
    var activities = activityService.getActivities();
    logger.info("Activities retrieved: {}", activities);
    return ResponseEntity.ok(activities);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
    activityService.deleteActivity(id);
    logger.info("Activity deleted: {}", id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
    Activity updatedActivity = activityService.updateActivity(id, activity);
    logger.info("Activity updated: {}", updatedActivity);
    return ResponseEntity.ok(updatedActivity);
  }
}
