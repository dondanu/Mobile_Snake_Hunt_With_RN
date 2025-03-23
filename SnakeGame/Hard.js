import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const gridSize = 15; // Smaller grid size
const initialSpeed = 100; // Snake speed at the start, faster for higher difficulty

// Function to generate random barriers as lines
const generateBarriers = (numberOfBarriers) => {
  let barriers = [];
  for (let i = 0; i < numberOfBarriers; i++) {
    const isHorizontal = Math.random() > 0.5;
    const position = Math.floor(Math.random() * (Math.floor(width / gridSize) - 1));
    const barrierLength = Math.floor(Math.random() * (Math.floor(width / gridSize) / 2) + 2); // Random length from 2 to half the screen width

    if (isHorizontal) {
      // Horizontal line barrier
      for (let j = 0; j < barrierLength; j++) {
        barriers.push({ x: position + j, y: Math.floor(Math.random() * (Math.floor(height / gridSize) - 1)) });
      }
    } else {
      // Vertical line barrier
      for (let j = 0; j < barrierLength; j++) {
        barriers.push({ x: Math.floor(Math.random() * (Math.floor(width / gridSize) - 1)), y: position + j });
      }
    }
  }
  return barriers;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed); // Snake speed state
  const [paused, setPaused] = useState(false); // To check if the game is paused
  const [score, setScore] = useState(0); // Score state
  const [started, setStarted] = useState(false); // To check if the game has started
  const [barriers, setBarriers] = useState(generateBarriers(5)); // Generate barriers

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    // Move the head in the current direction
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    // Make sure snake stays inside the grid
    if (head.x < 0) head.x = Math.floor((width - 40) / gridSize) - 1;
    if (head.x >= Math.floor((width - 40) / gridSize)) head.x = 0;
    if (head.y < 0) head.y = Math.floor((height - 180) / gridSize) - 1;
    if (head.y >= Math.floor((height - 180) / gridSize)) head.y = 0;

    newSnake.unshift(head); // Add new head at the front of the snake
    newSnake.pop(); // Remove the tail segment if the snake is not growing

    // Check for collisions with itself
    if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    // Check for collisions with barriers
    if (barriers.some(barrier => barrier.x === head.x && barrier.y === head.y)) {
      setGameOver(true);
      return;
    }

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      newSnake.push({ x: food.x, y: food.y });
      setFood({
        x: Math.floor(Math.random() * (Math.floor((width - 40) / gridSize))),
        y: Math.floor(Math.random() * (Math.floor((height - 180) / gridSize))),
      });
      setScore(score + 1);
      setSpeed(speed - 10);
    }

    setSnake(newSnake); // Update the snake state
  };

  useEffect(() => {
    if (gameOver) {
      Alert.alert('Game Over', `Your Score: ${score}`);
      return;
    }

    if (!paused && started) {
      const interval = setInterval(() => {
        moveSnake();
      }, speed);

      return () => clearInterval(interval);
    }
  }, [snake, direction, food, gameOver, speed, paused, score, started]);

  const onGestureEvent = (event) => {
    const { translationX, translationY } = event.nativeEvent;

    // Determine swipe direction
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0 && direction !== 'LEFT') {
        setDirection('RIGHT');
      } else if (translationX < 0 && direction !== 'RIGHT') {
        setDirection('LEFT');
      }
    } else {
      if (translationY > 0 && direction !== 'UP') {
        setDirection('DOWN');
      } else if (translationY < 0 && direction !== 'DOWN') {
        setDirection('UP');
      }
    }
  };

  const handlePause = () => {
    setPaused(!paused);
  };

  const handleRestart = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood({ x: 10, y: 10 });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(initialSpeed);
    setPaused(false);
    setStarted(false);
  };

  const handleStop = () => {
    Alert.alert('Game Stopped', `Your Score: ${score}`);
    setGameOver(true);
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Hard Snake Game</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={styles.gameContainer}>
          {snake.map((segment, index) => (
            <View
              key={index}
              style={[
                styles.snakeSegment,
                { top: segment.y * gridSize, left: segment.x * gridSize },
              ]}
            />
          ))}
          <View
            style={[
              styles.food,
              { top: food.y * gridSize, left: food.x * gridSize },
            ]}
          />
          {barriers.map((barrier, index) => (
            <View
              key={index}
              style={[
                styles.barrier,
                { top: barrier.y * gridSize, left: barrier.x * gridSize },
              ]}
            />
          ))}
        </View>
      </PanGestureHandler>

      <View style={styles.controlsContainer}>
        {!started ? (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handlePause}>
                <Text style={styles.buttonText}>{paused ? 'Resume' : 'Pause'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRestart}>
                <Text style={styles.buttonText}>Restart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={() => setSpeed(300)}>
                <Text style={styles.buttonText}>Slow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setSpeed(150)}>
                <Text style={styles.buttonText}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setSpeed(50)}>
                <Text style={styles.buttonText}>Fast</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  gameContainer: {
    width: width - 40,
    height: height - 180,
    position: 'relative',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  snakeSegment: {
    position: 'absolute',
    width: gridSize,
    height: gridSize,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  food: {
    position: 'absolute',
    width: gridSize,
    height: gridSize,
    backgroundColor: 'red',
    borderRadius: gridSize / 2,
  },
  barrier: {
    position: 'absolute',
    width: gridSize,
    height: gridSize,
    backgroundColor: 'black',
  },
  scoreContainer: {
    marginBottom: 20,
  },
  score: {
    color: 'white',
    fontSize: 18,
  },
  controlsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 8,
    margin: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default SnakeGame;
