class MedicalInfo {
  final String info;

  MedicalInfo({
    required this.info,
  });

  factory MedicalInfo.fromJson(Map<String, dynamic> json) {
    return MedicalInfo(
      info: json['info'],
    );
  }
}