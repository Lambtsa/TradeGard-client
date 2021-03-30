import { render, screen } from '@testing-library/react';
import App from './App';
import ItemCard from './components/ItemCard/ItemCard';


describe('The Header Component', () => {
  test('renders a header element', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
  test('renders a nav element', () => {
    render(<App />);
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
  });
  test('renders the navigation links', () => {
    render(<App />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/new-item');
    expect(links[2]).toHaveAttribute('href', '/trading');
    expect(links[3]).toHaveAttribute('href', '/likes');
    expect(links[4]).toHaveAttribute('href', '/my-account');
  });
});

describe('The Footer Component', () => {
  test('renders a footer', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
  test('renders copyright text', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    const year = new Date().getFullYear();
    expect(footer).toHaveTextContent(`© ${year} Moustacheteers. All rights reserved`);
  });
});

describe('The ItemCard Component', () => {
  const itemObj = {
    itemTitle: "desk",
    itemDescription: "lovely mango wood desk",
    itemImages: [
      "https://images.unsplash.com/photo-1520261714703-84c0762360ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    ],
    itemCategory: "furniture",
    itemOwner: "Dave",
  }
  test('renders a list item given an item object', () => {
    render(<ItemCard item={itemObj} />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });
  test('renders an image given an item object', () => {
    render(<ItemCard item={itemObj} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', itemObj.itemImages[0]);
    expect(image).toHaveAttribute('alt', itemObj.itemTitle)
  });
  test('renders a header given an item object', () => {
    render(<ItemCard item={itemObj} />);
    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(itemObj.itemTitle);
  });
});
