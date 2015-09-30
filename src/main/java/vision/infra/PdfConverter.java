package vision.infra;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;

import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.Pipeline;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFilesImpl;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.HTML;
import com.itextpdf.tool.xml.html.TagProcessorFactory;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

@Component
public class PdfConverter {

	public byte[] convertHtmlToPdf(final String html, boolean landscape) throws DocumentException, IOException {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
        final Document document = new Document();
        if (landscape) document.setPageSize(PageSize.A4.rotate());
        final PdfWriter writer = PdfWriter.getInstance(document, output);
        document.open();
        final TagProcessorFactory tagProcessorFactory = Tags.getHtmlTagProcessorFactory();
        tagProcessorFactory.removeProcessor(HTML.Tag.IMG);
        tagProcessorFactory.addProcessor(new ImageTagProcessor(), HTML.Tag.IMG);
        
        InputStream inputstream = null;
        
		try {
			URL bootstrap = getClass().getResource("/WEB-INF/assets/bower_components/bootstrap/dist/css/bootstrap.min.css");
			if (bootstrap != null)
				inputstream = new FileInputStream(bootstrap.toURI().getPath());
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
        
        final CssFilesImpl cssFiles = new CssFilesImpl();
        
        if (inputstream != null)
        	cssFiles.add(XMLWorkerHelper.getInstance().getCSS(inputstream));
        
        final StyleAttrCSSResolver cssResolver = new StyleAttrCSSResolver(cssFiles);
        final HtmlPipelineContext hpc = new HtmlPipelineContext(new CssAppliersImpl(new XMLWorkerFontProvider()));
        hpc.setAcceptUnknown(true).autoBookmark(true).setTagFactory(tagProcessorFactory);
        final HtmlPipeline htmlPipeline = new HtmlPipeline(hpc, new PdfWriterPipeline(document, writer));
        final Pipeline<?> pipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
        final XMLWorker worker = new XMLWorker(pipeline, true);
        final Charset charset = Charset.forName("ISO-8859-1");
        final XMLParser xmlParser = new XMLParser(true, worker, charset);
        xmlParser.parse(new ByteArrayInputStream(html.getBytes()), charset);
        document.close();
        return output.toByteArray();
	}
}
