---
title: "Quick Tips & Tricks"
date: "2024-10-22"
category: "notes"
module: "01-productivity"
order: 1
tags: ["Tips", "Productivity", "Shortcuts", "Development"]
description: "Collection of useful tips, shortcuts, and productivity hacks for developers and engineers."
author: "Jose Lorenzo"
estimatedTime: "15 min"
difficulty: "beginner"
prerequisites: []
---

# Quick Tips & Tricks

## Git Tips

### Undo Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1
```

### Stash with Message

```bash
git stash save "WIP: feature description"
```

### View Stash Contents

```bash
git stash show -p stash@{0}
```

### Clean Up Merged Branches

```bash
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

## Linux Command Line

### Find Large Files

```bash
find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null
```

### Monitor System Resources

```bash
htop  # Interactive process viewer
iotop # I/O monitoring
nethogs # Network bandwidth by process
```

### Quick HTTP Server

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### SSH Tunnel

```bash
# Local port forwarding
ssh -L 8080:localhost:80 user@remote-server

# Remote port forwarding
ssh -R 8080:localhost:3000 user@remote-server
```

## Docker Tips

### Clean Up Everything

```bash
docker system prune -a --volumes
```

### View Container Logs (Follow)

```bash
docker logs -f --tail 100 container_name
```

### Execute Command in Running Container

```bash
docker exec -it container_name /bin/bash
```

### Copy Files To/From Container

```bash
# To container
docker cp file.txt container_name:/path/

# From container
docker cp container_name:/path/file.txt ./
```

## VS Code Shortcuts

### Multi-Cursor Editing

- `Ctrl+Alt+↓/↑` - Add cursor above/below
- `Alt+Click` - Add cursor at click position
- `Ctrl+D` - Select next occurrence
- `Ctrl+Shift+L` - Select all occurrences

### Navigation

- `Ctrl+P` - Quick file open
- `Ctrl+Shift+O` - Go to symbol
- `F12` - Go to definition
- `Alt+←/→` - Navigate back/forward

### Editing

- `Ctrl+Shift+K` - Delete line
- `Alt+↑/↓` - Move line up/down
- `Shift+Alt+↑/↓` - Copy line up/down
- `Ctrl+/` - Toggle comment

## Python Tips

### List Comprehensions

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i+j for j in range(3)] for i in range(3)]
```

### Context Managers

```python
# File handling
with open('file.txt', 'r') as f:
    content = f.read()

# Custom context manager
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    print(f"Elapsed: {time.time() - start:.2f}s")

with timer():
    # Your code here
    pass
```

### Debugging

```python
# Quick debugging
import pdb; pdb.set_trace()

# Better debugging (Python 3.7+)
breakpoint()
```

## JavaScript/TypeScript Tips

### Array Methods

```javascript
// Map, filter, reduce
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((acc, x) => acc + x, 0);

// Find
const first = arr.find(x => x > 10);
const index = arr.findIndex(x => x > 10);

// Some/Every
const hasEven = arr.some(x => x % 2 === 0);
const allPositive = arr.every(x => x > 0);
```

### Destructuring

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, ...others } = person;

// Function parameters
function greet({ name, age = 18 }) {
    console.log(`Hello ${name}, age ${age}`);
}
```

### Optional Chaining

```javascript
// Safe property access
const city = user?.address?.city;

// Safe function call
const result = obj.method?.();

// Safe array access
const item = arr?.[0];
```

## Markdown Tips

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Code Blocks with Syntax Highlighting

````markdown
```python
def hello():
    print("Hello, World!")
```
````

## Productivity Hacks

### Pomodoro Technique

1. Work for 25 minutes
2. Take a 5-minute break
3. Repeat 4 times
4. Take a longer 15-30 minute break

### Time Blocking

- Block specific times for specific tasks
- Minimize context switching
- Protect deep work time

### Keyboard Shortcuts

Learn and use keyboard shortcuts for:
- Your IDE/editor
- Your terminal
- Your browser
- Your OS

## Resources

- [DevDocs](https://devdocs.io/) - API documentation browser
- [Regex101](https://regex101.com/) - Regex tester
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Explainshell](https://explainshell.com/) - Command line explainer

