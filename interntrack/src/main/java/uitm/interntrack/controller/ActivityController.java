package uitm.interntrack.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uitm.interntrack.entity.Activity;
import uitm.interntrack.service.ActivityService;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

  private ActivityService activityService;

  public ActivityController(ActivityService activityService) {
    this.activityService = activityService;
  }

  @PostMapping("/create")
  public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
    var targeActivity = activityService.createActivity(activity);
    return ResponseEntity.ok(targeActivity);
  }

  @GetMapping("/")
  public ResponseEntity<List<Activity>> getActivities() {
    var activities = activityService.getActivities();
    return ResponseEntity.ok(activities);
  }

}
