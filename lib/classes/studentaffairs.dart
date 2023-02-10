class Announcement {
  String announcementID,
      announcementTitle,
      announcementDesc,
      announcementTime,
      announcementSchedule;

  Announcement(this.announcementID, this.announcementTitle,
      this.announcementDesc, this.announcementTime, this.announcementSchedule);
}

class Session {
  // THIS IS CLASS, I USE SESSION CAUSE CLASS IS A KEYWORD IN DART
  String sessionID, sessionName, teacherID;

  Session(this.sessionID, this.sessionName, this.teacherID);
}

class Subject {
  String subjectID, subjectName;

  Subject(this.subjectID, this.subjectName);
}

class Attendance {
  String attendanceID, subjectID, childID, teacherID, classID, parentID;
  bool attendance;

  Attendance(this.attendanceID, this.subjectID, this.childID, this.teacherID,
      this.classID, this.parentID, this.attendance);
}

class Homework {
  String homeworkID, homeworkTitle, homeworkDesc, subjectID, classID;

  Homework(this.homeworkID, this.homeworkTitle, this.homeworkDesc,
      this.subjectID, this.classID);
}

class Grade {
  String gradeID, childID, grade, parentID, teacherID, subjectID;

  Grade(this.gradeID, this.childID, this.grade, this.parentID, this.teacherID,
      this.subjectID);
}
