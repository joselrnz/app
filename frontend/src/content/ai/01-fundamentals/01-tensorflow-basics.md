---
title: "TensorFlow Fundamentals"
date: "2024-10-16"
category: "ai"
module: "01-fundamentals"
order: 1
tags: ["TensorFlow", "Neural Networks", "Python", "Machine Learning"]
description: "Getting started with TensorFlow for machine learning, building and training your first neural network."
author: "Jose Lorenzo"
estimatedTime: "25 min"
difficulty: "intermediate"
prerequisites: []
---

# TensorFlow Fundamentals

## Introduction

TensorFlow is an open-source machine learning framework developed by Google. This guide covers the basics of building and training neural networks with TensorFlow 2.x.

## Installation

```bash
pip install tensorflow numpy matplotlib
```

Verify installation:

```python
import tensorflow as tf
print(tf.__version__)
```

## Your First Neural Network

Let's build a simple neural network to classify handwritten digits (MNIST dataset).

```python
import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

# Load the MNIST dataset
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Normalize pixel values to 0-1
x_train = x_train / 255.0
x_test = x_test / 255.0

# Build the model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
history = model.fit(
    x_train, y_train,
    epochs=5,
    validation_split=0.2,
    verbose=1
)

# Evaluate on test data
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=0)
print(f'\nTest accuracy: {test_acc:.4f}')
```

## Understanding the Model

### Layers Explained

1. **Flatten Layer**: Converts 28x28 images into 1D arrays (784 values)
2. **Dense Layer (128 neurons)**: Fully connected layer with ReLU activation
3. **Dropout Layer**: Prevents overfitting by randomly dropping 20% of neurons
4. **Output Layer (10 neurons)**: One neuron per digit (0-9) with softmax activation

### Activation Functions

- **ReLU** (Rectified Linear Unit): `f(x) = max(0, x)`
- **Softmax**: Converts outputs to probabilities that sum to 1

## Making Predictions

```python
# Make predictions on test data
predictions = model.predict(x_test[:5])

# Display results
for i in range(5):
    plt.subplot(1, 5, i+1)
    plt.imshow(x_test[i], cmap='gray')
    plt.title(f'Pred: {np.argmax(predictions[i])}')
    plt.axis('off')
plt.show()
```

## Saving and Loading Models

```python
# Save the model
model.save('mnist_model.h5')

# Load the model
loaded_model = keras.models.load_model('mnist_model.h5')

# Use the loaded model
predictions = loaded_model.predict(x_test)
```

## Visualizing Training History

```python
plt.figure(figsize=(12, 4))

# Plot accuracy
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()

# Plot loss
plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()

plt.tight_layout()
plt.show()
```

## Key Concepts

### Tensors

Tensors are multi-dimensional arrays:

```python
# Scalar (0D tensor)
scalar = tf.constant(42)

# Vector (1D tensor)
vector = tf.constant([1, 2, 3, 4])

# Matrix (2D tensor)
matrix = tf.constant([[1, 2], [3, 4]])

# 3D tensor
tensor_3d = tf.constant([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
```

### Loss Functions

- **Sparse Categorical Crossentropy**: For multi-class classification with integer labels
- **Binary Crossentropy**: For binary classification
- **Mean Squared Error**: For regression problems

### Optimizers

- **Adam**: Adaptive learning rate, good default choice
- **SGD**: Stochastic Gradient Descent
- **RMSprop**: Good for recurrent neural networks

## Common Issues

**Overfitting?**
- Add more dropout layers
- Reduce model complexity
- Get more training data
- Use data augmentation

**Underfitting?**
- Increase model complexity
- Train for more epochs
- Reduce regularization

**Slow training?**
- Use GPU acceleration
- Reduce batch size
- Simplify model architecture

## Next Steps

1. Try different architectures (CNNs, RNNs)
2. Experiment with hyperparameters
3. Use transfer learning with pre-trained models
4. Deploy models with TensorFlow Serving
5. Explore TensorFlow Lite for mobile devices

## Resources

- [TensorFlow Official Tutorials](https://www.tensorflow.org/tutorials)
- [Keras Documentation](https://keras.io/)
- [Deep Learning Specialization](https://www.deeplearning.ai/)

