class User {
  String userID, userName, userPassword, userEmail;
  bool userisActive;

  User(this.userID, this.userName, this.userPassword, this.userEmail,
      this.userisActive);
}

class Parent extends User {
  String parentID,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentContactNumber,
      parentType;
  DateTime parentDOB;

  Parent(
      this.parentID,
      this.parentFirstName,
      this.parentLastName,
      this.parentEmail,
      this.parentContactNumber,
      this.parentType,
      this.parentDOB,
      String userID,
      String userName,
      String userPassword,
      String userEmail,
      bool userisActive)
      : super(userID, userName, userPassword, userEmail, userisActive);
}

class Teacher extends User {
  String teacherID,
      teacherFirstName,
      teacherLastName,
      teacherEmail,
      teacherContactNumber,
      teacherBankAccountHolder,
      teacherBankName,
      teacherBankAccount;
  DateTime teacherDOB;

  Teacher(
      this.teacherID,
      this.teacherFirstName,
      this.teacherLastName,
      this.teacherEmail,
      this.teacherContactNumber,
      this.teacherBankAccountHolder,
      this.teacherBankName,
      this.teacherBankAccount,
      this.teacherDOB,
      String userID,
      String userName,
      String userPassword,
      String userEmail,
      bool userisActive)
      : super(userID, userName, userPassword, userEmail, userisActive);
}

class Child {
  String childID,
      childFirstName,
      childLastName,
      childGender,
      childParentID,
      childClass;
  DateTime childDOB;

  Child(this.childID, this.childFirstName, this.childLastName, this.childGender,
      this.childParentID, this.childClass, this.childDOB);
}
