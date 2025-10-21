import React, {useEffect, useRef, useState} from 'react';
import {AppRegistry, View, Text, StyleSheet, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedSplashApp = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [dots, setDots] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      
      <Animated.View style={[styles.circle, {transform: [{rotate}]}]}>
        <View style={styles.circleInner} />
      </Animated.View>

      <Animated.View style={[styles.content, {opacity: fadeAnim, transform: [{scale: scaleAnim}]}]}>
        <Text style={styles.emoji}>⚡️</Text>
        <Text style={styles.title}>Electrode Native</Text>
        <Text style={styles.subtitle}>Animated Splash MiniApp</Text>
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🎨 Lottie Ready</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🌈 Linear Gradients</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ Smooth Animations</Text>
        </View>

        <Text style={styles.loading}>Loading{dots}</Text>
      </Animated.View>

      <FloatingParticle delay={0} />
      <FloatingParticle delay={1000} />
      <FloatingParticle delay={2000} />
    </LinearGradient>
  );
};

const FloatingParticle = ({delay}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  return <Animated.View style={[styles.particle, {transform: [{translateY}]}]} />;
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  circle: {position: 'absolute', width: 300, height: 300, borderRadius: 150, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center'},
  circleInner: {width: 250, height: 250, borderRadius: 125, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)'},
  content: {alignItems: 'center', zIndex: 10},
  emoji: {fontSize: 80, marginBottom: 20},
  title: {fontSize: 42, fontWeight: 'bold', color: '#fff', marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 10},
  subtitle: {fontSize: 18, color: '#fff', opacity: 0.9, marginBottom: 40},
  badge: {backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginVertical: 5},
  badgeText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  loading: {marginTop: 40, fontSize: 18, color: '#fff', fontWeight: '500', width: 100},
  particle: {position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.6)', top: '20%', left: '20%'},
});

AppRegistry.registerComponent('AnimatedSplashApp', () => AnimatedSplashApp);
export default AnimatedSplashApp;

