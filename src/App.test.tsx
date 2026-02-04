import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the report header and intro headline', () => {
    render(<App />);

    expect(screen.getByText('Sustainable Sips Report')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Sustainable Sips – MIT x Heineken Report 2025' })
    ).toBeInTheDocument();
  });
});
