# Design Patterns in JS

## S-O-L-I-D Design Principles
1. `S` - __Single-responsibility principle__. A class should only have a single responsibility, that is, only changes to one part of the software's specification should be able to affect the specification of the class.  

__A class should have only one reason to change.__  
Robert C. Martin  

2. `O` - __Openc-Close principle__ программные сущности … должны быть открыты для расширения, но закрыты для модификации.  

3. `L` - __Liskov substitution principle__. «объекты в программе должны быть заменяемыми на экземпляры их подтипов без изменения правильности выполнения программы». Производный класс должен быть взаимозаменяем с родительским классом.  

Роберт С. Мартин определил[3] этот принцип так:
__Функции, которые используют базовый тип, должны иметь возможность использовать подтипы базового типа, не зная об этом.__  

4. `I` - __interface segregation principle__. "много интерфейсов, специально предназначенных для клиентов, лучше, чем один интерфейс общего назначения"  

Роберт С. Мартин определил[1] этот принцип так:
__Программные сущности не должны зависеть от методов, которые они не используют.__  

5. `D` - __dependency inversion principle__. "Зависимость на Абстракциях. Нет зависимости на что-то конкретное"  
- Модули верхних уровней не должны зависеть от модулей нижних уровней. Оба типа модулей должны зависеть от абстракций.  
- Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.  

## Gamma Categorization
Design Patterns are typically split into three categories

1. Creatinal Patterns
- deal with the creation (constuctor) of objects
- explicit (constructor) vs implicit (DI, reflection, etc)
- wholesale (single statement) vs piecewise (step-by-step)

2. Structural Patterns
- concerden with the structure (e.g. class memebers)
- many patterns are wrappers that mimic the underlying class' interface
- stress the importance of good API design

3. Behavioral Patterns
- they are all different; no central theme






