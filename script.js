let content = document.querySelector('#content');
let input=document.querySelector('#input-search')

input.addEventListener('keyup' , function(e){
    if(e.key == "Enter"){
        let value = input.value;
        async function ambilFilm(){
            try{
                const response = await fetch('http://omdbapi.com/?apikey=58b5402f&s='+value);
                if(!response.ok){
                    throw new Error("Data tidak ada ",response.statusText);
                }
                content.innerHTML = '';
                let films = await response.json();
                films = films.Search
                films.forEach(film => {
                    content.innerHTML += `<div class="card w-full sm:w-[45%] lg:w-[30%] border h-[600px] border-slate-700 rounded-lg overflow-hidden shadow-md shadow-slate-500">
                            <div class="w-full h-full overflow-hidden">
                                <img src="${film.Poster}" alt="" class="w-full h-[60%] object-fill">
                                <div class="px-4">
                                    <p class="mt-4">Description : </p>
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus </p>  
                                    <div class="pt-8">
                                        <button class="text-blue-600 py-2 detail-button rounded-xl bg-slate-200 text-center px-4" data-id=${film.imdbID}>See Details ...</button>
                                    </div>  
                                </div>
                            </div>
                        </div>`    
                });
                
            }catch(error){
                console.error(error)
            }
        }
        input.value ='';
        ambilFilm();
    }
})
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')

document.addEventListener('click',function(e){
   
    if(e.target.classList.contains('detail-button')){
        const button = e.target;
        const id = button.getAttribute('data-id');
                async function ambilDetail(){
                    try{
                        const response = await fetch('http://www.omdbapi.com/?apikey=58b5402f&i='+id);
                        const data = await response.json();
                        
                        modalContent.innerHTML = `<div class="w-[80%] bg-slate-100 h-[80%] sm:h-[60%] md:h-[63%] lg:h-[73%] relative p-[16px] z-[2000] ">
            <h1 class="text-3xl mb-2 border-b-2 border-slate-600">Movie Details : </h1>
            <div class="flex items-center justify-center gap-5 mt-5 lg:mt-2">
                <div class="w-[35%] h-full">
                    <img src="${data.Poster}" alt="">
                </div>
                <ul class="border border-slate-600 w-[60%] h-full">
                    <li class="border-b-2 border-slate-600 px-1 lg:px-3 py-1 md:py-4 lg:py-6">Title : ${data.Title}</li>
                    <li class="border-b-2 border-slate-600 px-1 lg:px-3 py-1 md:py-5 lg:py-6">Release : ${data.Released}?</li>
                    <li class="border-b-2 border-slate-600 px-1 lg:px-3 py-1 md:py-5 lg:py-6">Genre : ${data.Genre}</li>
                    <li class="border-b-2 border-slate-600 px-1 lg:px-3 py-1 md:py-5 lg:py-6">Director : ${data.Director}</li>
                    <li class="px-1 lg:px-3 py-1 lg:py-6">Plot : ${data.Plot}</li>
                </ul>
            </div>
            
        </div>`
                    }catch(e){
                        console.error(e)
                    }
                }
                ambilDetail()
                
                
                modal.classList.remove('hidden')
                modal.classList.add('active')

    }

    if(e.target == modalContent && e.target.tagName !=="BUTTON" ){
        modal.classList.remove('active')
        modal.classList.add('hidden')
    }
})