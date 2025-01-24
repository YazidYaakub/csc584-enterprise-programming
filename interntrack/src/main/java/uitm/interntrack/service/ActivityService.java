package uitm.interntrack.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uitm.interntrack.entity.Activity;
import uitm.interntrack.entity.Activity.UpdateActivityDTO;
import uitm.interntrack.repository.ActivityRepository;

@Service
public class ActivityService {

  @Autowired
  private ActivityRepository activityRepository;

  public Activity createActivity(Activity activity) {
    return activityRepository.save(activity);
  }

  public Map<String, Object> getActivities(int page, int size, String studentId, int month) {
    Integer start = page * size + 1;
    Integer end = start + size - 1;

    List<Activity> activities = activityRepository.getActivities(start, end, studentId, month);
    Long totalCount = activityRepository.countActivities(studentId, month);

    Map<String, Object> response = new HashMap<>();
    response.put("data", activities);
    response.put("total", totalCount);
    response.put("page", page);
    response.put("size", size);

    return response;
  }

  public Activity getActivity(String id) {
    return activityRepository.findById(id).orElseThrow(() -> new RuntimeException("Activity not found"));
  }

  @Transactional
  public Activity updateActivity(String id, UpdateActivityDTO updateActivityDTO) {
    Optional<Activity> activity = activityRepository.findById(id);

    if (activity.isEmpty()) {
      throw new RuntimeException("Activity not found");
    }

    activityRepository.updateActivity(id, updateActivityDTO.getActivityTitle(),
        updateActivityDTO.getActivityDescription(), updateActivityDTO.getApprovedById(),
        updateActivityDTO.getApprovedAt(), updateActivityDTO.getIsApproved());

    activityRepository.flush();

    return activityRepository.findById(id).orElseThrow(() -> new RuntimeException("Activity not found"));
  }

  public void deleteActivity(String id) {
    activityRepository.deleteById(id);
  }
}
