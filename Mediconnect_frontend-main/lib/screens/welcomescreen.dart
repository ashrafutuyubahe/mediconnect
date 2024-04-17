import 'package:flutter/material.dart';
import 'package:mediconnect/screens/images.dart';
import 'package:mediconnect/screens/text.dart';


class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Padding(padding: EdgeInsets.only(
          top: 0.0,
          left:0.0,
          bottom: 0.0,
          right:0.0
        ),
       child:Column(
        children: [
          Column(children: [
            Column( 
              crossAxisAlignment:CrossAxisAlignment.center ,
              children: [
                Container(
                  height: 300,
                  padding: EdgeInsets.fromLTRB(56.0, 50.0, 0.0, 0.0),
                child:Image(image:AssetImage(Images.logo)),
                ),
                
            
            Container(
              width: 300.0,
              height: 30.0,
              padding: EdgeInsets.fromLTRB(55.0, 0.0 ,0.0, 0.0),
              child:Text(
                  Texts.headline, style:TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 22.0,
                    fontWeight: FontWeight.w700,
                    color: Color.fromARGB(255, 4, 4, 5),
                    height: 0.0
                  ),
                 
                  ),
            ),
              const SizedBox(height: 20.0,) ,
              Center(child: Container(
                width:300.0,
                height:48.0,
             child:Center( child:Text(
                  Texts.subheadline, style:TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 16.0,
                    fontWeight: FontWeight.w400,
                    letterSpacing: 1,
                    color: Color.fromARGB(255, 43, 43, 44),
                    height: 0.0
)
                  ),
             )

              ),)

 
                    
           ] )
              ],
            )
           
          ],)

        ),
       ) 
      
    );
  }
}



