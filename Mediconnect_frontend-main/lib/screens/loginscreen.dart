import 'package:flutter/material.dart';



class LoginScreen extends StatelessWidget {
const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return  SingleChildScrollView(
      child:Padding(
        padding:EdgeInsets.only(
          top:56.0,
          left: 8.0,
          right: 8.0,
          bottom: 8.0
        ) ,
        child:Column(
          children: [
            Column(
            children: [
             Container(
               child: ElevatedButton(
               onPressed: () => {},
               style: ElevatedButton.styleFrom( 
                backgroundColor: Colors.transparent,
                elevation: 0,
               ),
              child: Icon(
              size: 30.0,
              Icons.arrow_left,
              color: Color.fromARGB(255, 11, 11, 11),
            )) ,
            alignment: Alignment.topLeft,

             ),
             Container(
              alignment:Alignment.topCenter ,
              child: Text('Sign In',style: TextStyle(
                 color: Color.fromARGB(255, 11, 11, 11),
                  fontFamily: 'Poppins',
                    fontSize: 18.0,
                    fontWeight: FontWeight.w700
              ),),),
              Form(
                child:Padding( 
                  padding: EdgeInsets.symmetric(vertical:32.0), 
                child: Column(
                  children: [
                    TextFormField(
                      decoration: InputDecoration(
                        prefixIcon: Icon(Icons.mail_outline),
                        labelText: 'Enter your email'
                      ),
                    ),
                    const SizedBox(height: 16.0,),
                       TextFormField(
                      decoration: InputDecoration(
                        prefixIcon: Icon(Icons.lock_outline),
                        labelText: 'Enter your password',
                        suffixIcon: Icon(Icons.remove_red_eye_outlined)
                      ),
                    ),
                     const SizedBox(height: 16.0/2,),
                     Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [ 
                      Row(children: [ 
                        Checkbox(value: true, onChanged: (value){}),
                        const Text('Remember Me',
                        style:TextStyle( 
                                 fontFamily: 'Poppins',
                                 fontSize: 13.0,
                                 fontWeight: FontWeight.w500,
                        ))
                      ],),
                      TextButton(onPressed: (){}, 
                      child: Text('ForgetPassword' , style:TextStyle(
                               color: Color.fromARGB(255, 64, 124, 226),
                                fontFamily: 'Poppins',
                                 fontSize: 13.0,
                                 fontWeight: FontWeight.w500,
                                 


                      )))
                     ],),
                   const SizedBox(height:32.0),
                   SizedBox(width: double.infinity,
                    child:ElevatedButton(onPressed: () {}, 
                      style: ElevatedButton.styleFrom( 
                      backgroundColor: Color.fromARGB(255, 64, 124, 226),
                      
               ),
                    child: Text('Sign In',style: TextStyle(
                                fontFamily: 'Poppins',
                                 fontSize: 16.0,
                                 fontWeight: FontWeight.w600,
                                 color: Color.fromARGB(255, 255, 255, 255)
                   ),),))  
                  ],))),
            Row(
              mainAxisAlignment:  MainAxisAlignment.center ,

              children: [
                Flexible(child:Divider(color: Colors.grey,thickness: 0.5,indent:60,endIndent:5)),
                 Flexible(child:Divider(color: Colors.grey,thickness: 0.5,indent:60,endIndent:5)),
                  Flexible(child:Divider(color: Colors.grey,thickness: 0.5,indent:60,endIndent:5)),
              ],)
                
                       
            ]
            )
          ]
        ))
    );
  }
}

