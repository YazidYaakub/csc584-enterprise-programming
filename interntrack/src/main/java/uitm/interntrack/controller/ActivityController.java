package uitm.interntrack.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uitm.interntrack.entity.Activity;
import uitm.interntrack.entity.Activity.UpdateActivityDTO;
import uitm.interntrack.service.ActivityService;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

  @Autowired
  private ActivityService activityService;

  @PostMapping("/create")
  public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
    var targeActivity = activityService.createActivity(activity);
    return ResponseEntity.ok(targeActivity);
  }

  @GetMapping("/")
  public ResponseEntity<Map<String, Object>> getActivities(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(required = false) String studentId,
      @RequestParam(required = false) int month) {
    var activities = activityService.getActivities(page, size, studentId, month);
    return ResponseEntity.ok(activities);
  }

  @GetMapping("{id}")
  public ResponseEntity<?> getActivity(@PathVariable String id) {
    Activity activity = activityService.getActivity(id);

    if (activity == null) {
      return ResponseEntity.status(404).body(String.format("Activity with ID %d not found", id));
    }

    return ResponseEntity.ok(activity);
  }

  @PutMapping("{id}")
  public ResponseEntity<Activity> updateActivity(@PathVariable String id, @RequestBody UpdateActivityDTO activity) {

    Activity targetActivity = activityService.getActivity(id);

    if (targetActivity == null) {
      return ResponseEntity.notFound().build();
    }

    Activity updatedActivity = activityService.updateActivity(id, activity);
    return ResponseEntity.ok(updatedActivity);
  }

}
