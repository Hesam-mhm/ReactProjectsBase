# Design System

This folder contains all the base design settings and styles for the project.

## File Structure

### 1. `constants.ts`
This file contains all design constants such as colors, typography, and spacing.

#### Colors (COLORS)
```typescript
COLORS = {
  PRIMARY: {
    MAIN: '#D71920',
    LIGHT: { 100: '#FBDFE0', ... },
    DARK: { 100: '#AD141A', ... }
  },
  SECONDARY: { ... },
  ERROR: { ... },
  SUCCESS: { ... },
  GREY: { ... },
  COMMON: { ... }
}
```

#### Typography (TYPOGRAPHY)
```typescript
TYPOGRAPHY = {
  FONT_FAMILY: 'Vazirmatn FD',
  FONT_WEIGHT: {
    REGULAR: 400,
    MEDIUM: 500,
    BOLD: 700
  },
  FONT_SIZE: {
    H1: 'clamp(1.5rem, 2vw + 1rem, 2rem)',
    H2: 'clamp(1.25rem, 1.75vw + 0.75rem, 1.75rem)',
    // ...
  },
  LINE_HEIGHT: {
    H1: 'clamp(2.25rem, 3vw + 1.5rem, 3.375rem)',
    H2: 'clamp(1.875rem, 2.5vw + 1.25rem, 3rem)',
    // ...
  }
}
```

### 2. `Common.styles.ts`
This file contains common styles and helper functions.

#### Typography Styles
```typescript
// Using base styles
import { TypographyStyles } from './Common.styles';

// In component
<h1 style={TypographyStyles.h1}>Title</h1>

// Using dynamic styles with different font weights
import { getTypographyStyle } from './Common.styles';

// In component
<h1 style={getTypographyStyle('h1', 'BOLD')}>Title with BOLD weight</h1>
<p style={getTypographyStyle('body1', 'MEDIUM')}>Text with MEDIUM weight</p>
```

#### Color Helper Functions
```typescript
// Lighten color
lighten(color: string, amount: number)

// Darken color
darken(color: string, amount: number)

// Convert hex to RGB
hexToRgb(hex: string)
```

### 3. `palette.ts`
This file defines color palette settings for different themes.

### 4. `Button.styles.ts`
Styles specific to buttons.

### 5. `DataGrid.styles.ts`
Styles specific to data tables.

### 6. `Form.styles.ts`
Styles specific to forms.

## Usage Guide

### 1. Using Colors
```typescript
import { COLORS } from './constants';

// Direct usage
const primaryColor = COLORS.PRIMARY.MAIN;

// Usage in styles
const style = {
  color: COLORS.PRIMARY.MAIN,
  backgroundColor: COLORS.PRIMARY.LIGHT[100]
};
```

### 2. Using Typography
```typescript
import { getTypographyStyle } from './Common.styles';

// In component
const MyComponent = () => {
  return (
    <div>
      <h1 style={getTypographyStyle('h1', 'BOLD')}>Main Title</h1>
      <p style={getTypographyStyle('body1', 'MEDIUM')}>Medium weight text</p>
      <span style={getTypographyStyle('caption')}>Small text</span>
    </div>
  );
};
```

### 3. Using Color Helper Functions
```typescript
import { lighten, darken, hexToRgb } from './Common.styles';

// Lighten color
const lighterColor = lighten(COLORS.PRIMARY.MAIN, 0.2);

// Darken color
const darkerColor = darken(COLORS.PRIMARY.MAIN, 0.2);

// Convert hex to RGB
const rgbColor = hexToRgb(COLORS.PRIMARY.MAIN);
```

## Key Features

1. **Responsive Typography**: All font sizes are responsive using `clamp`.
2. **Dynamic Font Weights**: You can dynamically change font weights.
3. **Theme Colors**: Colors are optimized for light and dark themes.
4. **Common Styles**: Use common styles to maintain design consistency.

## Complete Examples

### 1. Info Card
```typescript
import { getTypographyStyle } from './Common.styles';
import { COLORS } from './constants';

const InfoCard = () => {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: COLORS.PRIMARY.LIGHT[100],
      borderRadius: '8px'
    }}>
      <h2 style={getTypographyStyle('h2', 'BOLD')}>Card Title</h2>
      <p style={getTypographyStyle('body1', 'MEDIUM')}>Card Description</p>
    </div>
  );
};
```

### 2. Custom Button
```typescript
import { getTypographyStyle } from './Common.styles';
import { COLORS } from './constants';

const CustomButton = () => {
  return (
    <button style={{
      ...getTypographyStyle('body1', 'MEDIUM'),
      backgroundColor: COLORS.PRIMARY.MAIN,
      color: COLORS.COMMON.WHITE,
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer'
    }}>
      Custom Button
    </button>
  );
};
``` 