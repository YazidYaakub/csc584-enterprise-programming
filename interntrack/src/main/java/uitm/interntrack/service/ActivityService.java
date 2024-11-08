package uitm.interntrack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import uitm.interntrack.entity.Activity;
import uitm.interntrack.repository.ActivityRepository;

@Service
public class ActivityService {

  private final ActivityRepository activityRepository;

  public ActivityService(ActivityRepository activityRepository) {
    this.activityRepository = activityRepository;
  }

  public Activity createActivity(Activity activity) {
    return activityRepository.save(activity);
  }

  public List<Activity> getActivities() {
    return activityRepository.findAll();
  }
}
