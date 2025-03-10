import { View, Text, Image,ScrollView, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router'
import { createUser, signIn } from '../../lib/appwrite'
import { router } from 'expo-router';


const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = async () => {
    if (form.username.trim() === "" || form.email.trim() === "" || form.password.trim() === "") {
        Alert.alert('Error', 'Please fill in all the fields');
        return;
    }

    setIsSubmitting(true);

    try {

        const result = await createUser(form.email, form.password, form.username);

        if (!result) {
            throw new Error("Account creation failed.");
        }

        Alert.alert("Success", "Account created successfully! Logging you in...");


        const session = await signIn(form.email, form.password);
        if (!session) {
            throw new Error("Login failed after sign-up.");
        }

        router.replace('/home'); 

    } catch (error) {
        Alert.alert('Error', error.message);
    } finally {
        setIsSubmitting(false);
    }
};


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh]
        px-4 my-6">
          <Image
            source={images.logo} resizeMode='contain'
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
             Sign Up to UniMate
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form,
              username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form,
              email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form,
              password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
             title ="Sign Up"
             handlePress={submit}
             containerStyles="mt-7"
             isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>
                  Sign In
              </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp