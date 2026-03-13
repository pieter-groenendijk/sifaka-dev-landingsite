I want the roadmap to be horizontally scrollable where there is always an element partly shown to indicate there is more 
content/it's scrollable. At the same time I want elements to never become smaller than 300px, and never larger than 450px.

Thus the container must auto-fit elements until there is at least 300px of space left over for an additional element, yet
this auto-fit should ideally only divide it's visibile space with a buffer to spoil the unfocused elements a little.



// 1. Determine the number of items it could fit
unfocusedBuffer = 20%;
visibleSpace = 100% - unfocusedBuffer

idealItemWidth = 450px;

visibleItems = floor(visibleSpace / idealItemWidth);

// 2. 
itemWidth = 