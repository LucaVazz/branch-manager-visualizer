# Branch-Manager Visualizer

This Tool generates a Flowchart-Visualization of the possible choices in one of Netflix's Interactive Films. These include for example ["Black Mirror's Bandersnatch"](https://www.netflix.com/title/80988062), ["Puss in Book: Trapped in an Epic Tale"](https://www.netflix.com/title/80151644) and ["Minecraft Story Mode"](https://www.netflix.com/title/80227995).

Their interactivity is powered by the so called *Branch-Manager*.

> That’s why Netflix engineers built the company’s very own script-writing tool for branched narratives, dubbed Branch Manager.
> 
> ~ [Variety on Bandersnatch](https://variety.com/2018/digital/news/netflix-black-mirror-bandersnatch-interactive-1203096171/)


### Disclaimer
*This software is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Netflix or any of its subsidiaries or its affiliates.*
*This software is provided "as is" and any expressed or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the author or additional contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption).*


### Usage
Copy-paste the contents of `script.js` into the Dev-Console once you have started an Interactive Film and are past the introductory tutorial.

Additionally, the script also exposes a shorthand called `pS` to allow skipping to a specific segment (i.e. a specific scene): `pS('0cr3')`.
