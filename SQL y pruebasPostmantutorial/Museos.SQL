CREATE TABLE museum_entity (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  image TEXT,
  foundedBefore INTEGER NOT NULL
);


INSERT INTO museum_entity (id, name, description, address, city, image, foundedBefore) VALUES
('1', 'Museo del Oro', 'Colección precolombina de oro y cerámica.', 'Cra 6 #15-88', 'Bogotá', 'https://picsum.photos/seed/1/200/300', "1939"),
('2', 'Museo Nacional', 'Arte, historia y cultura colombiana.', 'Cra 7 #28-66', 'Bogotá', 'https://picsum.photos/seed/2/200/300', "1823"),
('3', 'Museo de Antioquia', 'Arte moderno y contemporáneo.', 'Calle 52 #52-43', 'Medellín', 'https://picsum.photos/seed/3/200/300', "1881"),
('4', 'Museo de Arte Moderno', 'Colecciones de arte moderno.', 'Av. El Dorado #68', 'Barranquilla', 'https://picsum.photos/seed/4/200/300', "1960"),
('5', 'Museo del Caribe', 'Cultura e historia del Caribe colombiano.', 'Calle 36 #46-66', 'Barranquilla', 'https://picsum.photos/seed/5/200/300', "2009"),
('6', 'Museo La Tertulia', 'Arte contemporáneo y cine.', 'Av. Colombia #5-105', 'Cali', 'https://picsum.photos/seed/6/200/300', "1956"),
('7', 'Museo de Arte Religioso', 'Arte sacro colonial.', 'Calle 10 #4-21', 'Popayán', 'https://picsum.photos/seed/7/200/300', "1972"),
('8', 'Museo de Arte Colonial', 'Arte colonial y barroco.', 'Calle 10 #5-101', 'Bogotá', 'https://picsum.photos/seed/8/200/300', "1942"),
('9', 'Museo de Arte Contemporáneo', 'Obras de artistas colombianos.', 'Calle 26 #35-45', 'Bogotá', 'https://picsum.photos/seed/9/200/300', "1980"),
('10', 'Museo Rafael Pombo', 'Literatura infantil y poesía.', 'Calle 10 #5-22', 'Bogotá', 'https://picsum.photos/seed/10/200/300', "1998"),
('11', 'Museo de la Independencia', 'Historia de la independencia.', 'Cra 7 #11-28', 'Bogotá', 'https://picsum.photos/seed/11/200/300', "1960"),
('12', 'Museo del Vidrio', 'Historia del vidrio en Colombia.', 'Calle 22 #14-55', 'Bogotá', 'https://picsum.photos/seed/12/200/300', "2005"),
('13', 'Museo de Arte Moderno de Medellín', 'Arte moderno internacional.', 'Cra 44 #19A-100', 'Medellín', 'https://picsum.photos/seed/13/200/300', "1978"),
('14', 'Museo Paleontológico', 'Fósiles y evolución.', 'Calle 1 #2-30', 'Villa de Leyva', 'https://picsum.photos/seed/14/200/300', 1977),
('15', 'Museo del Agua', 'Educación ambiental y recursos hídricos.', 'Av. Las Palmas #45-67', 'Medellín', 'https://picsum.photos/seed/15/200/300', "2010"),
('16', 'Museo Arqueológico', 'Restos arqueológicos prehispánicos.', 'Calle 3 #5-10', 'San Agustín', 'https://picsum.photos/seed/16/200/300', "1985"),
('17', 'Museo de la Ciencia', 'Tecnología e innovación.', 'Av. 30 #45-90', 'Manizales', 'https://picsum.photos/seed/17/200/300', "2000"),
('18', 'Museo de la Música', 'Instrumentos y tradición musical.', 'Calle 12 #6-78', 'Ibagué', 'https://picsum.photos/seed/18/200/300', "1995"),
('19', 'Museo de la Memoria', 'Conflicto armado y reconciliación.', 'Cra 8 #20-30', 'Bogotá', 'https://picsum.photos/seed/19/200/300', "2020"),
('20', 'Museo de Arte Indígena', 'Arte ancestral y cosmovisión.', 'Calle 7 #3-45', 'Leticia', 'https://picsum.photos/seed/20/200/300', "1990");