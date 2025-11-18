import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const services = [
  {
    title: 'Квартирный переезд',
    description: 'Быстрая и аккуратная перевозка вещей из квартиры',
    price: 'от 2 500 ₽',
    icon: 'Home'
  },
  {
    title: 'Офисный переезд',
    description: 'Профессиональная транспортировка офисного оборудования',
    price: 'от 5 000 ₽',
    icon: 'Building2'
  },
  {
    title: 'Погрузка/разгрузка',
    description: 'Погрузочно-разгрузочные работы любой сложности',
    price: 'от 400 ₽/час',
    icon: 'Package'
  },
  {
    title: 'Вывоз мусора',
    description: 'Быстрый вывоз строительного и бытового мусора',
    price: 'от 1 500 ₽',
    icon: 'Trash2'
  },
  {
    title: 'Сборка мебели',
    description: 'Профессиональная сборка и разборка мебели',
    price: 'от 800 ₽',
    icon: 'Sofa'
  },
  {
    title: 'Грузоперевозки',
    description: 'Транспортные услуги с грузчиками',
    price: 'от 1 200 ₽/час',
    icon: 'Truck'
  }
];

const priceList = [
  { service: 'Грузчик (1 час работы)', price: '400 ₽' },
  { service: 'Квартирный переезд (1 комната)', price: '2 500 ₽' },
  { service: 'Квартирный переезд (2 комнаты)', price: '4 500 ₽' },
  { service: 'Квартирный переезд (3+ комнаты)', price: '6 500 ₽' },
  { service: 'Офисный переезд (до 20 м²)', price: '5 000 ₽' },
  { service: 'Офисный переезд (20-50 м²)', price: '8 000 ₽' },
  { service: 'Сборка/разборка мебели', price: '800 ₽' },
  { service: 'Упаковка вещей', price: '600 ₽/час' },
  { service: 'Вывоз мусора (Газель)', price: '1 500 ₽' },
  { service: 'Подъем/спуск на этаж (без лифта)', price: '+300 ₽/этаж' }
];

const reviews = [
  {
    name: 'Александр М.',
    rating: 5,
    text: 'Отличная команда! Переезжали из трёхкомнатной квартиры, всё сделали быстро и аккуратно. Ни одной царапины на мебели.',
    date: '15.11.2024'
  },
  {
    name: 'Елена К.',
    rating: 5,
    text: 'Профессионалы своего дела. Помогли с офисным переездом, упаковали всю технику. Рекомендую!',
    date: '10.11.2024'
  },
  {
    name: 'Дмитрий П.',
    rating: 5,
    text: 'Заказывал вывоз строительного мусора. Приехали точно в срок, работали быстро. Цена соответствует качеству.',
    date: '05.11.2024'
  },
  {
    name: 'Марина С.',
    rating: 4,
    text: 'Хороший сервис, грузчики вежливые и работают качественно. Единственное – немного задержались, но предупредили заранее.',
    date: '01.11.2024'
  }
];

const Index = () => {
  const [moveType, setMoveType] = useState('');
  const [rooms, setRooms] = useState('');
  const [floor, setFloor] = useState('');
  const [hasElevator, setHasElevator] = useState('');
  const [workers, setWorkers] = useState('2');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    let basePrice = 0;
    
    if (moveType === 'apartment') {
      if (rooms === '1') basePrice = 2500;
      else if (rooms === '2') basePrice = 4500;
      else if (rooms === '3+') basePrice = 6500;
    } else if (moveType === 'office') {
      basePrice = 5000;
    } else if (moveType === 'loading') {
      basePrice = 400 * parseInt(workers);
    }

    if (hasElevator === 'no' && floor) {
      const floorNum = parseInt(floor);
      basePrice += 300 * floorNum;
    }

    setCalculatedPrice(basePrice);
    toast.success('Стоимость рассчитана!');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={28} className="text-accent" />
              <span className="text-xl font-bold text-primary">ПроГрузчик</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-accent transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('price')} className="text-sm font-medium hover:text-accent transition-colors">Прайс</button>
              <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium hover:text-accent transition-colors">Калькулятор</button>
              <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-accent transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-accent transition-colors">О компании</button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-accent transition-colors">Контакты</button>
            </div>
            <Button onClick={() => scrollToSection('contacts')} className="bg-accent hover:bg-accent/90">
              Заказать звонок
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Профессиональные грузчики в Москве
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Быстро, надёжно, аккуратно. Более 500 успешных переездов. Опытная команда и современное оборудование.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => scrollToSection('calculator')} size="lg" className="bg-accent hover:bg-accent/90 text-lg">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button onClick={() => scrollToSection('contacts')} size="lg" variant="outline" className="text-lg">
                  <Icon name="Phone" size={20} className="mr-2" />
                  +7 (495) 123-45-67
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in border-2 hover:border-accent">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} size={24} className="text-accent" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-accent">{service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="price" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Прайс-лист</h2>
            <div className="max-w-3xl mx-auto">
              <Card className="border-2">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {priceList.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors">
                        <span className="text-foreground font-medium">{item.service}</span>
                        <span className="text-accent font-bold text-lg">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <p className="text-center text-sm text-muted-foreground mt-6">
                * Итоговая стоимость зависит от объёма работ и удалённости объекта
              </p>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Калькулятор стоимости</h2>
            <div className="max-w-2xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Рассчитайте стоимость услуг</CardTitle>
                  <CardDescription>Заполните данные для примерного расчёта</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="moveType">Тип переезда</Label>
                    <Select value={moveType} onValueChange={setMoveType}>
                      <SelectTrigger id="moveType">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Квартирный переезд</SelectItem>
                        <SelectItem value="office">Офисный переезд</SelectItem>
                        <SelectItem value="loading">Погрузка/разгрузка</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {moveType === 'apartment' && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="rooms">Количество комнат</Label>
                      <Select value={rooms} onValueChange={setRooms}>
                        <SelectTrigger id="rooms">
                          <SelectValue placeholder="Выберите количество" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 комната</SelectItem>
                          <SelectItem value="2">2 комнаты</SelectItem>
                          <SelectItem value="3+">3+ комнаты</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {moveType === 'loading' && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="workers">Количество грузчиков</Label>
                      <Select value={workers} onValueChange={setWorkers}>
                        <SelectTrigger id="workers">
                          <SelectValue placeholder="Выберите количество" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 грузчика</SelectItem>
                          <SelectItem value="3">3 грузчика</SelectItem>
                          <SelectItem value="4">4 грузчика</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="floor">Этаж</Label>
                    <Input 
                      id="floor" 
                      type="number" 
                      placeholder="Укажите этаж" 
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="elevator">Наличие лифта</Label>
                    <Select value={hasElevator} onValueChange={setHasElevator}>
                      <SelectTrigger id="elevator">
                        <SelectValue placeholder="Выберите вариант" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Есть лифт</SelectItem>
                        <SelectItem value="no">Нет лифта</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <Button onClick={calculatePrice} size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={!moveType}>
                    <Icon name="Calculator" size={20} className="mr-2" />
                    Рассчитать стоимость
                  </Button>

                  {calculatedPrice !== null && (
                    <div className="text-center p-6 bg-accent/10 rounded-lg animate-scale-in">
                      <p className="text-sm text-muted-foreground mb-2">Примерная стоимость:</p>
                      <p className="text-4xl font-bold text-accent">{calculatedPrice.toLocaleString('ru-RU')} ₽</p>
                      <p className="text-xs text-muted-foreground mt-2">Точная стоимость определяется после осмотра</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Отзывы клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {reviews.map((review, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription className="text-sm">{review.date}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">О компании</h2>
              <p className="text-lg text-foreground mb-6">
                Компания "ПроГрузчик" работает на рынке услуг грузоперевозок с 2015 года. За это время мы помогли более 500 клиентам осуществить переезды любой сложности.
              </p>
              <p className="text-lg text-foreground mb-8">
                Наша команда состоит из профессиональных грузчиков с опытом работы от 5 лет. Мы гарантируем сохранность ваших вещей и соблюдение сроков.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <div className="text-muted-foreground">Переездов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">9 лет</div>
                  <div className="text-muted-foreground">На рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">100%</div>
                  <div className="text-muted-foreground">Гарантия</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Контакты</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Свяжитесь с нами</CardTitle>
                    <CardDescription>Мы работаем ежедневно с 8:00 до 22:00</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={20} className="text-accent" />
                      <div>
                        <p className="font-semibold">Телефон:</p>
                        <a href="tel:+74951234567" className="text-accent hover:underline">+7 (495) 123-45-67</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={20} className="text-accent" />
                      <div>
                        <p className="font-semibold">Email:</p>
                        <a href="mailto:info@progruzchik.ru" className="text-accent hover:underline">info@progruzchik.ru</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={20} className="text-accent" />
                      <div>
                        <p className="font-semibold">Адрес:</p>
                        <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Заказать звонок</CardTitle>
                    <CardDescription>Оставьте заявку и мы перезвоним вам</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input id="name" placeholder="Иван Иванов" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')}>
                      Отправить заявку
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={24} />
              <span className="font-bold">ПроГрузчик</span>
            </div>
            <p className="text-sm">© 2024 ПроГрузчик. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Icon name="Phone" size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
