import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Camisa Vermelha',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Uma camisa vermelha, perfeita para dias sem tempo vermelho.',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Tapete Azul',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Combina perfeitamente com sua camisa vermelha. É pra pisar em cima, não vestir.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Xícara de Café',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Também pode ser usada para chá!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'O Livro - Edição Limitada',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "Qual o conteúdo? Não importa! É uma edição limitada!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'Notebook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Hardware incrível, teclado ruim e preço alto. Compre logo antes que seja lançado um novo!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Caneta & Papel',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Pode ser usado para role playing (não o tipo de role playing que você pensa...).",
    5.49
  )
];

export default PRODUCTS;
