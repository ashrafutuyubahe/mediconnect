import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mediconnect/screens/images.dart';
import 'package:mediconnect/screens/text.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:mediconnect/screens/onBoardController.dart';
import 'package:get/get.dart';

class OnBoardingScreen extends StatelessWidget {
  const OnBoardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(OnBoardingController());
    return Scaffold(
        body: Stack(children: [
      PageView(
        controller: controller.pageController,
        onPageChanged: controller.updatePageIndicator,
        children: [
          OnBoardingPage(
              image: Images.OnBoardingImage1, text: Texts.OnBoardingtext1),
          OnBoardingPage(
              image: Images.OnBoardingImage2, text: Texts.OnBoardingtext2),
        ],
      ),
      OnBoardinSkip(),
      OnBoardingDotNavigation(),
      NavigatingArrow()
    ]));
  }
}

class NavigatingArrow extends StatelessWidget {
  const NavigatingArrow({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
        right: 24.0,
        bottom: kBottomNavigationBarHeight - 20,
        child: ElevatedButton(
            onPressed: () => OnBoardingController.instance.nextPage(),
            style: ElevatedButton.styleFrom(
                shape: CircleBorder(),
                backgroundColor: Color.fromARGB(255, 49, 106, 228),
                minimumSize: Size(56, 56)),
            child: Icon(
              size: 30.0,
              Icons.arrow_forward,
              color: const Color.fromARGB(255, 255, 255, 255),
            )));
  }
}

class OnBoardinSkip extends StatelessWidget {
  const OnBoardinSkip({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
        top: kToolbarHeight,
        right: 24.0,
        child: TextButton(
            onPressed: ()=>OnBoardingController.instance.skipPage() ,
            child: const Text('Skip',
                style: TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 14.0,
                    fontWeight: FontWeight.w400))));
  }
}

class OnBoardingDotNavigation extends StatelessWidget {
  const OnBoardingDotNavigation({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final controller = OnBoardingController.instance;

    return Positioned(
        left: 34.0,
        bottom: kBottomNavigationBarHeight,
        child: SmoothPageIndicator(
            count: 2,
            controller: controller.pageController,
            onDotClicked: controller.dotNavigationClick,
            effect: ExpandingDotsEffect(dotHeight: 6.0, dotWidth: 13.17)));
  }
}

class OnBoardingPage extends StatelessWidget {
  const OnBoardingPage({super.key, required this.image, required this.text});
  final String image, text;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        body: Stack(children: [
          PageView(children: [
            Column(
              children: [
                Container(
                    width: 320.0,
                    height: 320.0,
                    margin: EdgeInsets.fromLTRB(0.0, 50.0, 0.0, 60.0),
                    child: Center(
                        child: Image(
                      image: AssetImage(image),
                    ))),
                Container(
                    width: 300.0,
                    margin: EdgeInsets.fromLTRB(0.0, 30.0, 30.0, 0.0),
                    child: Text(text,
                        style: TextStyle(
                            fontFamily: 'Poppins',
                            fontWeight: FontWeight.w600,
                            fontSize: 20.0,
                            color: Color(0xFF221f1f)))),
                const SizedBox(
                  height: 30.0,
                )
              ],
            )
          ])
        ]));
  }
}
