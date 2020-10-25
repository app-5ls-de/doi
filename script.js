// doi regex from https://github.com/regexhq/doi-regex
var doiRegex = new RegExp('(?:^' + '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)' + '$)') 

function getDoi(string) {
    if (!string || !typeof string == "string") return false

    string = string.trim()
                    .replace('doi:','')
                    .replace(/^http(s)?\:\/\//,'')
                    .replace('dx.doi.org/','')
                    .replace('doi.org/','')
                    .replace('doi-org.emedien.ub.uni-muenchen.de/','') 

    if (doiRegex.test(string)) return string
    return false
}


var input = document.getElementById("input")
var a_doi = document.getElementById("doi")
var a_lmu = document.getElementById("lmu")
var a_sci = document.getElementById("sci")

setTimeout(() => { input.focus() }, 0)


function updateLinks() {
    let doi = getDoi(input.innerText)
    console.log(doi)
    if (doi) {
        document.body.classList.remove("invalid")
        a_doi.href = "https://doi.org/" + doi
        a_lmu.href = "https://doi-org.emedien.ub.uni-muenchen.de/" + doi
        a_sci.href = "https://"+"sci"+"-"+"hub"+"."+"se"+"/" + doi

        window.history.replaceState({}, document.title, "/" + doi);
    } else {
        document.body.classList.add("invalid")
        
        window.history.replaceState({}, document.title, "/");
    }
}

input.addEventListener("input", updateLinks, false)


var URLParameter = location.pathname.substring(1)
if (URLParameter) {
    input.innerText = URLParameter
    updateLinks()
}